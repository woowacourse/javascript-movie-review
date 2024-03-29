import './MovieList.css';
import {
  fetchPopularMovies,
  fetchSearchMovies,
  processMovieRequestResults,
} from '../../services/MovieService';
import MovieStore from '../../stores/movieStore';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MovieItem from '../MovieItem/MovieItem';
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

const MovieList = () => {
  const $section = createSection();
  const $title = document.createElement('h2');
  const $ul: HTMLUListElement = createUl();

  const loadMoreButton = LoadMoreButton();
  const $loadMoreBtn = loadMoreButton.render();
  const $skeleton = SkeletonMovieList().render();

  const render = ({
    title,
    type,
    isLastPage,
  }: {
    title: string;
    type: string;
    isLastPage: boolean;
  }) => {
    $title.textContent = title;

    $loadMoreBtn.setAttribute('list-type', type);

    $section.appendChild($title);
    $section.appendChild($ul);
    if (!isLastPage) $section.appendChild($loadMoreBtn);

    return $section;
  };

  const onSuccess = (data: MovieResponse) => {
    const { page, movies, isLastPage } = processMovieRequestResults(data);

    updateMovieList({ movies, $ul });

    const updatedMovies =
      page === 1 ? [...movies] : [...MovieStore.movies, ...movies];
    updateMovieStore({ movies: updatedMovies, page });

    $section.removeChild($skeleton);

    loadMoreButton.setVisibility(isLastPage);
  };

  const onError = (res: Response) => {
    const $errMsg = ErrorMessage().render(res.status);

    $section.appendChild($errMsg);
    $section.removeChild($skeleton);
    $loadMoreBtn.classList.add('hide');
  };

  const onLoading = () => {
    const { type } = MovieStore;
    $title.textContent = `${type === 'popular' ? '지금 인기있는 영화' : `\"${MovieStore.query}\" 검색 결과`}`;
    $section.appendChild($skeleton);
  };

  document.addEventListener('popularMovies', () => {
    fetchPopularMovies({
      params: { page: MovieStore[MovieStore.type].page },
      onSuccess,
      onError,
      onLoading,
    });
  });

  document.addEventListener('searchMovies', () => {
    const { query } = MovieStore.search;

    fetchSearchMovies({
      params: { page: MovieStore[MovieStore.type].page, query },
      onSuccess,
      onError,
      onLoading,
    });
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
