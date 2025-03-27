import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import { MovieItem as MovieItemType } from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Text } from '../common/Text';
import { createSkeletonItems } from './MovieSkeleton';
import { Empty } from './Empty';
import { createMovieItems } from './MovieItem';
import { initObserver, observeTarget } from '../../utils/observer';

const titleText = Text({
  classList: ['text-2xl', 'font-bold', 'mb-64'],
  props: { textContent: '지금 인기 있는 영화' },
});

const movieUl = createElement<HTMLUListElement>('ul', {
  classList: 'thumbnail-list',
});

const sectionElement = createElement('section', {
  classList: 'container',
  children: [titleText, movieUl],
});

const mainElement = createElement('main', {
  children: [sectionElement],
});

const updateListTitle = (
  titleElement: HTMLElement,
  isSearch: boolean,
  query: string,
) => {
  titleElement.textContent = isSearch
    ? `검색 결과: ${query}`
    : '지금 인기 있는 영화';
};

const handleMoreMovieData = async () => {
  const response = movieFetcher.currentMovieResponse;
  const hasNextPage = response.page < response.total_pages;

  if (!hasNextPage) return;

  await (movieFetcher.isSearchState
    ? movieFetcher.getNextPageSearchMovies()
    : movieFetcher.getNextPagePopularMovies());
};

const observerCallback = async (entries: IntersectionObserverEntry[]) => {
  const entry = entries[0];

  if (entry.isIntersecting && !movieFetcher.isLoadingState) {
    await handleMoreMovieData();
  }
};

const setupIntersectionObserver = () => {
  const lastMovieItem = document.querySelector('.movie-item:last-child');
  if (!lastMovieItem) return;

  initObserver(observerCallback);
  observeTarget(lastMovieItem);
};

const renderMoreLoadingState = (itemCount: number) => {
  const skeletons = createSkeletonItems(itemCount);
  movieUl.append(...skeletons);
};

const renderEmptyState = () => {
  const emptyElement = Empty();

  movieUl.innerHTML = '';
  movieUl.appendChild(emptyElement);
};

const renderMovies = (movies: MovieItemType[]) => {
  const movieElements = createMovieItems(movies);

  movieUl.innerHTML = '';
  movieUl.append(...movieElements);
};

const renderMovieList = () => {
  const {
    movies: results,
    queryText: query,
    isLoadingState: isLoading,
    isSearchState: isSearch,
    errorState: error,
  } = movieFetcher;

  updateListTitle(titleText, isSearch, query);
  if (error) return;
  if (isLoading && !(isSearch && results.length === 0)) {
    return renderMoreLoadingState(20);
  }
  if (isSearch && results.length === 0 && !isLoading) {
    return renderEmptyState();
  }

  renderMovies(results);
  setupIntersectionObserver();
};

export const MovieList = (): HTMLElement => {
  const app = document.querySelector('#app');
  app?.append(mainElement);

  movieFetcher.getPopularMovies(1);

  renderMovieList();
  movieFetcherEvent.subscribe(renderMovieList);

  return mainElement;
};
