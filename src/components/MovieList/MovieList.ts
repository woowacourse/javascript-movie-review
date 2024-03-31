import './MovieList.css';

import SELECTORS from '../../constants/selectors';
import {
  fetchPopularMovies,
  fetchSearchMovies,
  processMovieListResponse,
} from '../../services/TMDBService';

import MovieStore from '../../stores/movieStore';

import { openModal } from '../common/modal/Modal';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import MovieDetailModal from '../MovieDetailModal/MovieDetailModal';
import MovieItem from '../MovieItem/MovieItem';
import InfiniteScrollTrigger, {
  restartObserving,
  stopObserving,
} from './InfiniteScrollTrigger/InfiniteScrollTrigger';
import ResultNotFound from './ResultNotFound/ResultNotFound';
import SkeletonMovieList from './SkeletonMovieList';

const createSection = () => {
  const $section = document.createElement('section');
  $section.classList.add('item-view');
  return $section;
};

const createUl = () => {
  const $ul = document.createElement('ul');
  $ul.classList.add('item-list');
  return $ul;
};

const showResultNotFound = () => {
  const $section = document.querySelector('.item-view');

  if ($section) {
    const $resultNotFound = ResultNotFound().render();
    $section.appendChild($resultNotFound);
  }
};

const updateMovieList = ({
  movies,
  $ul,
}: {
  movies: MovieItem[];
  $ul: HTMLUListElement;
}) => {
  if (MovieStore.page === 1) {
    $ul.textContent = '';
  }

  if (movies.length === 0) {
    showResultNotFound();
  }

  movies.forEach((movie) => {
    const $movieItem = MovieItem(movie).render();
    $ul.appendChild($movieItem);
  });
};

const updateMovieStore = ({
  movies,
  page,
}: {
  movies: MovieItem[];
  page: number;
}) => {
  MovieStore.setMovies({
    value: movies,
  });

  MovieStore.setPage(page + 1);
};

const openMovieDetailModal = (id: number) => {
  const $movieDetail = MovieDetailModal(id).render();
  openModal($movieDetail);
};

const MovieList = () => {
  const $section = createSection();
  const $title = document.createElement('h2');
  const $ul: HTMLUListElement = createUl();

  const $skeleton = SkeletonMovieList().render();
  const $infiniteScrollTrigger = InfiniteScrollTrigger().render();

  const render = ({
    title,
    isLastPage,
  }: {
    title: string;
    isLastPage: boolean;
  }) => {
    $title.textContent = title;

    $section.appendChild($title);
    $section.appendChild($ul);
    if (!isLastPage && $infiniteScrollTrigger)
      $section.appendChild($infiniteScrollTrigger);

    return $section;
  };

  const onSuccess = (data: MovieListResponse) => {
    const { page, movies, isLastPage } = processMovieListResponse(data);

    updateMovieList({ movies, $ul });

    const updatedMovies =
      page === 1 ? [...movies] : [...MovieStore.movies, ...movies];
    updateMovieStore({ movies: updatedMovies, page });

    $section.removeChild($skeleton);

    if (!isLastPage) restartObserving($infiniteScrollTrigger);
  };

  const onError = (res: Response) => {
    const $errMsg = ErrorMessage().render(res.status);

    $section.appendChild($errMsg);
    $section.removeChild($skeleton);

    stopObserving($infiniteScrollTrigger);
  };

  const onLoading = () => {
    stopObserving($infiniteScrollTrigger);

    const { type } = MovieStore;
    $title.textContent = `${type === 'popular' ? '지금 인기있는 영화' : `\"${MovieStore.query}\" 검색 결과`}`;
    $section.appendChild($skeleton);
  };

  document.addEventListener('popularMovies', () => {
    fetchPopularMovies({
      onSuccess,
      onError,
      onLoading,
    });
  });

  document.addEventListener('searchMovies', () => {
    fetchSearchMovies({
      onSuccess,
      onError,
      onLoading,
    });
  });

  $ul.addEventListener('click', (e: MouseEvent) => {
    const target = e.target as HTMLElement;
    if (!target) return;

    const $card = target.parentElement;
    if (!$card) return;

    if ($card.className === SELECTORS.MOVIE_ITEM.card) {
      const id = $card.getAttribute('data-id');
      openMovieDetailModal(Number(id));
    }
  });

  document.dispatchEvent(
    new CustomEvent('popularMovies', {
      bubbles: true,
    }),
  );

  return {
    render,
  };
};

export default MovieList;
