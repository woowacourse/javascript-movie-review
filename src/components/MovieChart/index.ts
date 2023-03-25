import { assemble, Event } from '../../core';
import { getElement } from './../../utils/common/domHelper';
import { MovieListComponent, MovieOverviewModalComponent, SkeletonMovieListComponent } from './action';
import { useMovieChart } from '../../hooks/useMovieChart';
import { NO_RESULT } from '../../constants/movieChart';
import { observer } from '../../utils/common/observer';

export interface MovieChartProps {
  keyword: string;
}

const MovieChart = assemble<MovieChartProps>(({ keyword }) => {
  const {
    values: { movieChart, movieList, isLoading, focusedMovie, isOpen },
    handlers: { fetchMore, closeModal, onClickMovie, setMyVote },
  } = useMovieChart(keyword);
  const needMoreFetch = !isLoading && movieChart?.movieChartInfo.page !== movieChart?.movieChartInfo.total_pages;
  const noResult = !isLoading && !movieChart?.movieChartInfo.total_results;

  observer('.fetch-more-line', {
    onIntersect() {
      if (!isLoading && needMoreFetch) fetchMore(keyword);
    },
  });

  const $events: Event[] = [
    {
      event: 'click',
      callback: onClickMovie,
    },
  ];

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
      <fragment id="MovieOverviewModal">
        ${
          isOpen && focusedMovie
            ? MovieOverviewModalComponent({
                focusedMovie,
                closeModal,
                setMyVote,
              })
            : ''
        }
      </fragment>
    </main>
      `);

  return [$template, $events];
});

export { MovieChart };
