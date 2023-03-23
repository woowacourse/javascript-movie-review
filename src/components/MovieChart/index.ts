import { assemble, Event, useEffect } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';

interface MovieChart {
  keyword: string;
}
let page: number;
const MovieChart = assemble<MovieChart>(({ keyword }) => {
  const { chartInfo, movieList, isLoading, fetchMore, subtitle } = useMovieChart(keyword);

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        if (e.target === $('.btn.primary')) fetchMore(keyword);
      },
    },
  ];

  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>${subtitle}</h2>
        <fragment id='MovieList'>
          ${chartInfo ? MovieListComponent({ movieList }) : ''}
        </fragment>
        <fragment id='SkeletonList'>
        ${isLoading ? SkeletonMovieListComponent() : ''}
        </fragment>
        <button class="btn primary full-width" ${chartInfo?.page === 500 ? 'disabled' : ''}>
        ${
          chartInfo?.page === 500 || movieList.length % 20 !== 0 || movieList.length === 0 ? '마지막 페이지' : '더 보기'
        }
        </button>
      </section>
      </main>
      `);

  return [$template, $events];
});

export { MovieChart };
