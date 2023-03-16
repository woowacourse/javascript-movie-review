import {
  fetchMoviesByKeyword,
  GetMoviesByKeywordRes,
  fetchPopularMovies,
  GetPopularMoviesRes,
  waitFor,
} from './../../apis/index';
import { assemble, Event, useEffect, useState } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';

interface MovieChart {
  keyword: string;
}

let page: number;
const MovieChart = assemble<MovieChart>(({ keyword }) => {
  const [chartInfo, setChartInfo] = useState<GetPopularMoviesRes | GetMoviesByKeywordRes>();
  const [movieList, setMovieList] = useState<(typeof chartInfo)['results']>([]);
  const [isLoading, setIsLoading] = useState(true);

  const getPopularMovies = async () => {
    setIsLoading(true);

    const [data, error] = await waitFor<GetPopularMoviesRes>(fetchPopularMovies(page));
    if (error) throw new Error(JSON.stringify(error));
    setChartInfo(data);
    setMovieList([...movieList, ...data.results]);

    page += 1;
    setIsLoading(false);

    setTimeout(() => {
      scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  const getMoviesByKeyword = async () => {
    setIsLoading(true);

    const [data, error] = await waitFor<GetMoviesByKeywordRes>(fetchMoviesByKeyword(keyword, page));
    if (error) throw new Error(JSON.stringify(error));
    setChartInfo(data);

    if (page === 1) {
      setMovieList(data.results);
    } else {
      setMovieList([...movieList, ...data.results]);
    }

    page += 1;
    setIsLoading(false);

    setTimeout(() => {
      scrollTo({ left: 0, top: document.body.scrollHeight, behavior: 'smooth' });
    }, 500);
  };

  const fetchMore = async () => {
    if (keyword) getMoviesByKeyword();
    else getPopularMovies();
  };

  useEffect(() => {
    page = 1;

    fetchMore();
  }, [keyword]);

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
        </fragment>
        <button class="btn primary full-width" ${chartInfo?.page === 500 ? 'disabled' : ''}>
        ${chartInfo?.page === 500 ? '마지막 페이지' : '더 보기'}
        </button>
      </section>
      </main>
      `);

  return [$template, $events];
});

export { MovieChart };
