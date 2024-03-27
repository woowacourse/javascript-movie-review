import MovieService from '../../services/MovieService';
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

  document.addEventListener('search', (e) => {
    const { detail } = e as CustomEvent;
    if (detail.curType !== 'search') movieStore.setPage(1);

    const {
      $skeletonMovieList,
      removeSkeletonMovieList,
      insertSkeletonMovieList,
    } = useSkeletonMovieList(`\"${detail.query}\" 검색 결과`);

    insertSkeletonMovieList();

    MovieService.fetchSearchMovies({
      query: detail.query,
      page: movieStore.page,
    })
      .then(({ movies, page, isLastPage, isEmptyResults }) => {
        if (isEmptyResults) {
          return showSearchResultsNotFound($skeletonMovieList);
        }

        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () => {
            removeSkeletonMovieList({ type: 'search', isLastPage });
          });
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () => {
            removeSkeletonMovieList({ type: 'search', isLastPage });
          });
          movieStore.setPage(page + 1);
        }
      })
      .catch(() => {
        clearItemViewForError();
      });
  });

  document.addEventListener('popular', (e) => {
    const { detail } = e as CustomEvent;
    if (detail.curType !== 'popular') movieStore.setPage(1);

    const { removeSkeletonMovieList, insertSkeletonMovieList } =
      useSkeletonMovieList('지금 인기있는 영화');

    insertSkeletonMovieList();

    MovieService.fetchPopularMovies({ page: movieStore.page })
      .then(({ movies, page, isLastPage }) => {
        if (page !== 1) {
          movieStore.setMovies([...movieStore.movies, ...movies], () => {
            removeSkeletonMovieList({ type: 'popular', isLastPage });
          });
          movieStore.setPage(page + 1);
        } else {
          movieStore.setMovies(movies, () => {
            removeSkeletonMovieList({ type: 'popular', isLastPage });
          });
          movieStore.setPage(page + 1);
        }
      })
      .catch(() => {
        clearItemViewForError();
      });
  });

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
