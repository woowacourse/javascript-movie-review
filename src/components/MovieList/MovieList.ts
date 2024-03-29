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

const updateMovieList = (movies: MovieItem[], $list: HTMLUListElement) => {
  $list.textContent = '';
  movies.forEach((movie) => {
    const $movieItem = MovieItem(movie).render();
    $list.appendChild($movieItem);
  });
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

  const updateMovieStore = ({
    movies,
    page,
  }: {
    movies: MovieItem[];
    page: number;
  }) => {
    MovieStore.setMovies({
      value: movies,
      callback: () => updateMovieList(movies, $ul),
    });

    MovieStore.setPage(page + 1);
  };

  const onSuccess = (data: MovieResponse) => {
    const { page, movies, isLastPage } = processMovieRequestResults(data);

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
