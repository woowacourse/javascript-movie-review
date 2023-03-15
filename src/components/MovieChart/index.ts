import { getPopularMovies, GetPopularMoviesRes, MovieInfo, waitFor } from './../../apis/index';
import { assemble, Event, useEffect, useState } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';

const MovieChart = assemble(() => {
  const [chartInfo, setChartInfo] = useState<GetPopularMoviesRes | null>(null);
  const [movieList, setMovieList] = useState<MovieInfo[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchMore = async () => {
    setIsLoading(true);
    const [data] = await waitFor<GetPopularMoviesRes>(getPopularMovies((chartInfo?.page || 0) + 1));

    if (data) {
      setChartInfo(data);
      setMovieList([...movieList, ...data.results]);
    }

    setIsLoading(false);

    setTimeout(() => {
      scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  useEffect(() => {
    fetchMore();
  }, []);

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        if (e.target === $('.btn.primary')) fetchMore();
      },
    },
  ];

  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <fragment id='MovieList'>
        ${chartInfo ? MovieListComponent({ movieList }) : ''}
        </fragment>
        <fragment id='SkeletonList'>
        ${isLoading ? SkeletonMovieListComponent() : ''}
        <fragment id='MovieList'>
        <button class="btn primary full-width" ${chartInfo?.page === 500 ? 'disabled' : ''}>
        ${chartInfo?.page === 500 ? '마지막 페이지' : '더 보기'}
        </button>
      </section>
    </main>
        `);

  return [$template, $events];
});

export { MovieChart };
