import './MovieList.css';
import {
  fetchPopularMovies,
  fetchSearchMovies,
  processMovieRequestResults,
} from '../../services/MovieService';
import { popularMovieStore, searchMovieStore } from '../../stores/movieStore';
import ErrorMessage from '../ErrorMessage/ErrorMessage';
import LoadMoreButton from '../LoadMoreButton/LoadMoreButton';
import MovieItem from '../MovieItem/MovieItem';
import SkeletonMovieList from './SkeletonMovieList';

const getSearchQuery = ($title: HTMLElement) => {
  if ($title && $title.textContent) return $title.textContent.split('"')[1];
};

export const appendMovieItems = (
  movies: MovieItem[],
  $ul: HTMLUListElement,
) => {
  if ($ul) {
    const fragment = document.createDocumentFragment();
    movies.forEach((movie: MovieItem) => {
      const $movieItem = MovieItem(movie).render();
      fragment.appendChild($movieItem);
    });
    $ul.appendChild(fragment);
  }
};

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

const MovieList = () => {
  const $section = createSection();
  const $title = document.createElement('h2');
  const $ul = createUl();
  const $loadMoreBtn = LoadMoreButton().render();
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

  const onPopularQuerySuccess = (data: MovieResponse) => {
    const { page, movies, isLastPage } = processMovieRequestResults(data);

    const updatedMovies =
      page !== 1 ? [...popularMovieStore.movies, ...movies] : [...movies];

    popularMovieStore.setMovies({
      value: updatedMovies,
      callback: () => appendMovieItems(movies, $ul),
    });
    popularMovieStore.setPage(page + 1);

    $section.removeChild($skeleton);

    isLastPage
      ? $loadMoreBtn.classList.add('hide')
      : $loadMoreBtn.classList.remove('hide');
  };

  const onError = (res: Response) => {
    const $errMsg = ErrorMessage().render(res.status);

    $section.appendChild($errMsg);
    $section.removeChild($skeleton);
    $loadMoreBtn.classList.add('hide');
  };

  const onLoading = () => {
    $section.appendChild($skeleton);
  };

  // $loadMoreBtn.addEventListener('click', () => {
  //   if (type === 'search') {
  //     $loadMoreBtn.dispatchEvent(
  //       new CustomEvent('search', {
  //         bubbles: true,
  //         detail: {
  //           query: getSearchQuery($title),
  //           curType: type,
  //         },
  //       }),
  //     );
  //   }
  //   if (type === 'popular') {
  //     $loadMoreBtn.dispatchEvent(
  //       new CustomEvent('popular', {
  //         bubbles: true,
  //         detail: {
  //           curType: type,
  //         },
  //       }),
  //     );
  //   }
  // });

  document.addEventListener('popular', () => {
    fetchPopularMovies({
      params: { page: popularMovieStore.page },
      onSuccess: onPopularQuerySuccess,
      onError,
      onLoading,
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
    render,
  };
};
export default MovieList;
