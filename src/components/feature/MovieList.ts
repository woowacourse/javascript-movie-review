import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import {
  MovieItem as MovieItemType,
  MovieResponse,
} from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Text } from '../common/Text';
import { MovieItem } from './MovieItem';
import { MovieSkeleton } from './MovieSkeleton';
import { Empty } from './Empty';

let isLoading = false;
let hasMorePages = true;
let observer: IntersectionObserver | null = null;
let prevSearchQuery = '';
let isFirstSearch = true;

const renderErrorState = () => {
  const error = movieFetcher.errorState;
  if (!error) return;

  titleText.style.display = 'none';
  movieUl.style.display = 'none';

  const errorContainer = createElement('div', {
    classList: 'error-container',
  });

  const errorMessage = Text({
    classList: ['text-2xl', 'font-bold'],
    props: {
      textContent:
        error.message || '영화 정보를 불러오는 중 오류가 발생했습니다.',
    },
  });

  errorContainer.append(errorMessage);
  sectionElement.insertBefore(errorContainer, movieUl);
};

const createMovieItems = (movies: MovieItemType[]) => {
  return movies.map((movie) => MovieItem(movie));
};

const updateListTitle = (
  titleElement: HTMLElement,
  isSearch: boolean,
  query: string,
) => {
  titleElement.textContent = isSearch
    ? `검색 결과: ${query}`
    : '지금 인기 있는 영화';
};

const observerTarget = Text({
  classList: ['observer-target', 'observer-height', 'w-full', 'mt-20'],
});

const titleText = Text({
  classList: ['text-2xl', 'font-bold', 'mb-32'],
  props: { textContent: '지금 인기 있는 영화' },
});

const movieUl = createElement<HTMLUListElement>('ul', {
  classList: 'thumbnail-list',
});

const sectionElement = createElement('section', {
  classList: 'container',
  children: [titleText, movieUl, observerTarget],
});

const mainElement = createElement('main', {
  children: [sectionElement],
});

const createSkeletonItems = (count = 20) => {
  return Array.from({ length: count }, () => {
    const skeleton = MovieSkeleton();
    skeleton.classList.add('next-page-skeleton');
    return skeleton;
  });
};

const loadNextPage = async () => {
  if (isLoading || !hasMorePages) return;
  isLoading = true;

  movieUl.append(...createSkeletonItems());

  const response = movieFetcher.currentMovieResponse;
  hasMorePages = response.page < response.total_pages;

  if (!hasMorePages) {
    removeSkeletons();
    return;
  }

  const isSearchMode = movieFetcher.isSearchState;

  await (isSearchMode
    ? movieFetcher.getNextPageSearchMovies()
    : movieFetcher.getNextPagePopularMovies());

  isLoading = false;
};

const removeSkeletons = () => {
  const skeletons = movieUl.querySelectorAll('.next-page-skeleton');
  skeletons.forEach((skeleton) => skeleton.remove());
};

const setupInfiniteScroll = () => {
  if (observer) {
    observer.disconnect();
  }

  observer = new IntersectionObserver((entries) => {
    if (entries[0].isIntersecting && !isLoading && hasMorePages) {
      loadNextPage();
    }
  });

  observer.observe(observerTarget);
};

const renderInitialLoadingState = () => {
  movieUl.innerHTML = '';
  movieUl.append(...createSkeletonItems());
};

const renderEmptyState = () => {
  const emptyElement = Empty();

  movieUl.innerHTML = '';
  movieUl.appendChild(emptyElement);
  observerTarget.classList.add('hidden');
};

const renderMovies = (movies: MovieItemType[], response: MovieResponse) => {
  const movieElements = createMovieItems(movies);

  if (response.page === 1) {
    movieUl.innerHTML = '';
    movieUl.append(...movieElements);
  } else {
    removeSkeletons();
    movieUl.append(...movieElements);
  }

  hasMorePages = response.page < response.total_pages;

  if (!hasMorePages) {
    observerTarget.classList.add('hidden');
  } else {
    observerTarget.classList.remove('hidden');
  }
};

const renderMovieList = () => {
  const results = movieFetcher.movies || [];
  const query = movieFetcher.queryText;
  const response = movieFetcher.currentMovieResponse;
  const isLoadingState = movieFetcher.isLoadingState;
  const isSearch = movieFetcher.isSearchState;
  const error = movieFetcher.errorState;

  const isNewSearch = isSearch && query !== prevSearchQuery;
  prevSearchQuery = query;

  updateListTitle(titleText, isSearch, query);

  if (error) {
    renderErrorState();
    return;
  }

  if (isLoadingState && response.page === 1 && (isFirstSearch || isNewSearch)) {
    renderInitialLoadingState();
    isFirstSearch = false;
    return;
  }

  if (isSearch && results.length === 0 && !isLoadingState) {
    renderEmptyState();
    return;
  }

  if (!isLoadingState) {
    renderMovies(results, response);
    setupInfiniteScroll();
  }
};

export const handleSearch = async (query: string) => {
  isFirstSearch = true;
  isLoading = false;
  hasMorePages = true;

  window.scrollTo({ top: 0, behavior: 'smooth' });

  await movieFetcher.getSearchMovies(1, query);
};

export const MovieList = (): HTMLElement => {
  const app = document.querySelector('#app');

  if (!app) {
    throw new Error('#app에 해당하는 요소가 없습니다.');
  }

  app.appendChild(mainElement);
  movieFetcher.getPopularMovies(1);

  renderMovieList();
  movieFetcherEvent.subscribe(renderMovieList);

  return mainElement;
};
