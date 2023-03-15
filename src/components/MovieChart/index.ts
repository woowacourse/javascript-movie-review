import { getPopularMovies, GetPopularMoviesRes, waitFor } from './../../apis/index';
import { assemble, Event, useEffect, useState } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { MovieComponent } from './action';

const MovieChart = assemble(() => {
  const [movieList, setMovieList] = useState<GetPopularMoviesRes | null>(null);

  useEffect(() => {
    (async () => {
      const [data] = await waitFor<GetPopularMoviesRes>(getPopularMovies(1));

      if (data) setMovieList(data);
    })();
  }, []);

  const $events: Event[] = [];
  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
        ${movieList?.results
          .map(
            (info) => `
          <fragment id="Movie-${info.id}">
            ${MovieComponent({ info })}
          </fragment>`
          )
          .join('')}
        </ul>
        <button class="btn primary full-width">더 보기</button>
      </section>
    </main>
  `);

  return [$template, $events];
});

export { MovieChart };
