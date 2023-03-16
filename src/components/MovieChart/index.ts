import { assemble, Event, useEffect } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';
import { LAST_PAGE } from '../../constants';

interface MovieChart {
  keyword: string;
}
let page: number;
const MovieChart = assemble<MovieChart>(({ keyword }) => {
  const { chartInfo, movieList, isLoading, fetchMore } = useMovieChart(keyword);

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        e.target === $('.btn.primary') && fetchMore(keyword);
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
        ${
          chartInfo?.page !== LAST_PAGE
            ? `<button class="btn primary full-width">
                더 보기
              </button>`
            : ''
        }
        
      </section>
      </main>
      `);

  return [$template, $events];
});

export { MovieChart };
