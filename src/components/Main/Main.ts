import { MovieService, MovieData } from '../../services/MovieService';
import movieStore from '../../stores/movieStore';
import MovieList from '../MovieList/MovieList';
import SkeletonMovieList from '../MovieList/SkeletonMovieList';

const clearItemViewForError = () => {
  const $ul = document.querySelector('.item-view ul') as HTMLElement;
  const $h2 = document.querySelector('.item-view h2') as HTMLElement;
  const $itemView = document.querySelector('.item-view');
  $itemView?.removeChild($ul);
  $itemView?.removeChild($h2);
};

const showSearchResultsNotFound = ($skeletonMovieList: HTMLElement) => {
  const $itemView = document.querySelector('.item-view');
  const $skeletonUl = $skeletonMovieList.querySelector('ul') as HTMLElement;
  $skeletonMovieList.removeChild($skeletonUl);

  const $searchResultsNotFound = document.createElement('p');
  $searchResultsNotFound.classList.add('search-results-not-found');
  $searchResultsNotFound.textContent = '검색 결과가 존재하지 않습니다.';

  $itemView?.appendChild($searchResultsNotFound);
};

const Main = () => {
  const $main = document.createElement('main');

  const useSkeletonMovieList = (title: string) => {
    const $skeletonMovieList = SkeletonMovieList({
      title,
    }).render();

    const insertSkeletonMovieList = () => {
      const $prevMovieList = $main.querySelector('.item-view') as HTMLElement;
      if ($prevMovieList) {
        $main.removeChild($prevMovieList);
      }
      $main.appendChild($skeletonMovieList);
    };

    const removeSkeletonMovieList = ({
      type,
      isLastPage,
    }: {
      type: string;
      isLastPage: boolean;
    }) => {
      $main.removeChild($skeletonMovieList);
      $main.appendChild(
        MovieList({
          title,
          type,
          isLastPage,
        }).render(),
      );
    };

    return {
      $skeletonMovieList,
      removeSkeletonMovieList,
      insertSkeletonMovieList,
    };
  };

  interface MovieDetail {
    curType: string;
    query: string;
  }

  type FetchFunction = (query: string, page: number) => Promise<MovieData>;

  function fetchSearchMovies(query: string, page: number): Promise<MovieData> {
    return MovieService.fetchSearchMovies({ query, page });
  }

  function fetchPopularMovies(
    _query: string, // 사용되지 않음
    page: number,
  ): Promise<MovieData> {
    return MovieService.fetchPopularMovies({ page });
  }

  const handleMovies = ({
    event,
    fetchFunction,
    eventType,
  }: {
    event: Event;
    fetchFunction: FetchFunction;
    eventType: string;
  }) => {
    const { detail } = event as CustomEvent<MovieDetail>;
    if (detail.curType !== eventType) movieStore.setPage(1);

    const title =
      eventType === 'search'
        ? `\"${detail.query}\" 검색 결과`
        : '지금 인기있는 영화';

    const {
      $skeletonMovieList,
      removeSkeletonMovieList,
      insertSkeletonMovieList,
    } = useSkeletonMovieList(title);
    insertSkeletonMovieList();

    fetchFunction(detail.query, movieStore.page)
      .then(({ movies, page, isLastPage, isEmptyResults }) => {
        if (isEmptyResults) {
          return showSearchResultsNotFound($skeletonMovieList);
        }

        movieStore.setMovies(
          page !== 1 ? [...movieStore.movies, ...movies] : movies,
          () => {
            removeSkeletonMovieList({ type: eventType, isLastPage });
            movieStore.setPage(page + 1);
          },
        );
      })
      .catch(() => {
        clearItemViewForError();
      });
  };

  const handleSearchMovies = (e: Event) => {
    handleMovies({
      event: e,
      fetchFunction: fetchSearchMovies,
      eventType: 'search',
    });
  };

  const handlePopularMovies = (e: Event) => {
    handleMovies({
      event: e,
      fetchFunction: fetchPopularMovies,
      eventType: 'popular',
    });
  };

  document.addEventListener('search', handleSearchMovies);
  document.addEventListener('popular', handlePopularMovies);

  document.dispatchEvent(
    new CustomEvent('popular', {
      bubbles: true,
      detail: {
        curType: 'popular',
      },
    }),
  );

  return {
    render: () => $main,
  };
};

export default Main;
