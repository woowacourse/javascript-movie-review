import { movieFetcher } from '../../domain/MovieFetcher';
import { movieFetcherEvent } from '../../domain/MovieFetcherEvent';
import {
  MovieItem as MovieItemType,
  MovieResponse,
} from '../../types/Movie.types';
import { createElement } from '../../utils/createElement';
import { Button } from '../common/Button';
import { Text } from '../common/Text';
import { MovieItem } from './MovieItem';
import { MovieSkeleton } from './MovieSkeleton';
import { Empty } from './Empty';
import { Img } from '../common/Img';

const renderErrorState = () => {
  const error = movieFetcher.errorState;
  if (!error) return;

  titleText.style.display = 'none';
  movieUl.style.display = 'none';
  moreBtn.style.display = 'none';
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

const createSkeletonItems = (count = 20) => {
  return Array.from({ length: count }, () => MovieSkeleton());
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
    : '인기 있는 영화';
};

const updateMoreButton = (
  button: HTMLButtonElement,
  currentPage: number,
  totalPages: number,
  isLoading: boolean = false,
) => {
  button.disabled = isLoading;
  button.textContent = isLoading ? '' : '더보기';
  button.style.display = currentPage >= totalPages ? 'none' : 'block';

  if (isLoading) {
    const loadingImg = Img({
      src: './images/loading.png',
      width: '35',
      height: '35',
      classList: ['loading-spinner'],
    });

    button.innerHTML = '';
    button.appendChild(loadingImg);
  }
};

const titleText = Text({
  classList: ['text-2xl', 'font-bold', 'mb-32'],
  props: { textContent: '인기 있는 영화' },
});

let movieUl = createElement<HTMLUListElement>('ul', {
  classList: 'thumbnail-list',
});

const moreBtn = Button({
  height: '48',
  classList: ['moreBtn', 'w-full', 'primary', 'text-xl'],
  props: { textContent: '더보기' },
  onClick: async () => {
    await handleMoreButtonClick();
  },
});

const sectionElement = createElement('section', {
  classList: 'container',
  children: [titleText, movieUl, moreBtn],
});

const mainElement = createElement('main', {
  children: [sectionElement],
});

const handleMoreButtonClick = async () => {
  const response = movieFetcher.currentMovieResponse;
  const hasNextPage = response.page < response.total_pages;

  if (!hasNextPage) return;

  updateMoreButton(moreBtn, response.page, response.total_pages, true);

  const isSearchMode = movieFetcher.isSearchState;

  await (isSearchMode
    ? movieFetcher.getNextPageSearchMovies()
    : movieFetcher.getNextPagePopularMovies());
};

const renderLoadingState = (itemCount: number, append: boolean) => {
  const skeletons = createSkeletonItems(itemCount);
  if (!append) {
    movieUl.innerHTML = '';
  }
  movieUl.append(...skeletons);
};

const renderEmptyState = () => {
  const emptyElement = Empty();

  movieUl.innerHTML = '';
  movieUl.appendChild(emptyElement);
  moreBtn.style.display = 'none';
};

const renderMovies = (movies: MovieItemType[], response: MovieResponse) => {
  const movieElements = createMovieItems(movies);

  movieUl.innerHTML = '';
  movieUl.append(...movieElements);

  updateMoreButton(moreBtn, response.page, response.total_pages);
};

const renderMovieList = () => {
  const {
    movies: results = [],
    queryText: query,
    currentMovieResponse: response,
    isLoadingState: isLoading,
    isSearchState: isSearch,
    errorState: error,
  } = movieFetcher;

  updateListTitle(titleText, isSearch, query);

  if (error) return renderErrorState();
  if (isLoading) return renderLoadingState(20, !isSearch);
  if (results.length === 0) return renderEmptyState();

  renderMovies(results, response);
};

export const MovieList = async (): Promise<HTMLElement> => {
  const app = document.querySelector('#app');
  if (app?.firstChild) {
    app.insertBefore(mainElement, app.firstChild.nextSibling);
  }

  renderLoadingState(20, false);
  await movieFetcher.getPopularMovies(1);

  renderMovieList();
  movieFetcherEvent.subscribe(renderMovieList);

  return mainElement;
};
