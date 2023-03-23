import { assemble, Event } from '../../core';
import { $, getElement } from './../../utils/common/domHelper';
import { MovieListComponent, SkeletonMovieListComponent } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';
import { NO_RESULT } from '../../constants';
import { observer } from '../../utils/common/observer';

export interface MovieChartProps {
  keyword: string;
}

const MovieChart = assemble<MovieChartProps>(({ keyword }) => {
  const { chartInfo, movieList, isLoading, fetchMore } = useMovieChart(keyword);
  const needMoreFetch = Boolean(!isLoading && chartInfo?.page !== chartInfo?.total_pages && movieList.length);

  observer('.fetch-more-line', {
    onIntersect() {
      if (!isLoading && needMoreFetch) fetchMore(keyword);
    },
  });

  const $events: Event[] = [
    {
      event: 'click',
      callback(e) {
        e.target === $('.btn.primary') && fetchMore(keyword);
      },
    },
  ];
  const noResult = !isLoading && !chartInfo?.total_results;
  const $template = getElement(`
    <main>
      <section class="item-view">
        <h2>지금 인기 있는 영화</h2>
        <div class="item-list-layout">
          <fragment id='MovieList'>
            ${MovieListComponent({ movieList })}
          </fragment>
          <fragment id='SkeletonList'>
            ${isLoading ? SkeletonMovieListComponent() : ''}
          </fragment>
          ${noResult ? `<h1>${NO_RESULT}</h1>` : ''}
        </div>
      </section>
      </main>
      `);

  return [$template, $events];
});

export { MovieChart };

// ${
//   needMoreBtn
//     ? `<button class="btn primary full-width">
//         더 보기
//       </button>`
//     : ''
// }
