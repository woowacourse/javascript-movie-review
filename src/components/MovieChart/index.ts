import { assemble, Event } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';
import { LAST_PAGE, NO_RESULT } from '../../constants';

export interface MovieChartProps {
  keyword: string;
}

const MovieChart = assemble<MovieChartProps>(({ keyword }) => {
  const { chartInfo, movieList, isLoading, fetchMore } = useMovieChart(keyword);

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        e.target === $('.btn.primary') && fetchMore(keyword);
      },
    },
  ];

  const noResult = !isLoading && !chartInfo.total_results;
  const needMoreBtn = Boolean(chartInfo?.page !== LAST_PAGE && movieList.length);
  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <div class="item-list-layout">
          <fragment id='MovieList'>
            ${!isLoading ? MovieListComponent({ movieList }) : ''}
          </fragment>
          <fragment id='SkeletonList'>
            ${isLoading ? SkeletonMovieListComponent() : SkeletonMovieListComponent()}
          </fragment>
          ${noResult ? `<h1>${NO_RESULT}</h1>` : ''}
        </div>
        ${
          needMoreBtn
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
