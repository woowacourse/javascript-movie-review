import { getPopularMovies, getSearchMovies } from "./apis/api.ts";
import { observeHeaderScroll } from "./observer.ts";
import MovieState from "./state/business/movieState.ts";
import {
  setupLoadMoreInteraction,
  setupSearchInteraction,
} from "./ui/business/interactor.ts";
import {
  paintClearBanner,
  paintEmptyResult,
  paintError,
  paintHomeSectionHeading,
  paintInitialLoading,
  paintLoadMoreButtonStatus,
  paintMovieBanner,
  paintMovieList,
  paintPrepareSearch,
  paintResetList,
} from "./ui/business/painter.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

export async function loadInitialMovie() {
  const { movies, page, totalPages } = await getPopularMovies({
    pageNum: INITIAL_PAGE_NUM,
    onLoading: () => paintInitialLoading(ONCE_MOVIE_LIMIT),
    onError: () => {
      paintError();
      paintClearBanner();
    },
  });

  MovieState.setNextPageNum(page + 1);
  MovieState.setRequestMovieCount(movies.length);

  paintHomeSectionHeading();
  if (movies.length > 0) {
    paintMovieBanner(movies[0]);
    observeHeaderScroll();
    paintMovieList(movies);
  }

  setupLoadMoreInteraction(loadMoreMovies);
  setupSearchInteraction(loadSearchMovies);
  paintLoadMoreButtonStatus(page !== totalPages);
}

export async function loadMoreMovies() {
  const { page, movies, totalPages } = await getPopularMovies({
    pageNum: MovieState.getNextPageNum(),
    onError: () => {
      paintError();
      paintClearBanner();
    },
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextPageNum(page + 1);
  paintLoadMoreButtonStatus(page !== totalPages);
  paintMovieList(movies);
}

export async function loadSearchMovies(query: string) {
  const { page, movies, totalPages } = await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onError: () => paintError(),
    onLoading: () =>
      paintPrepareSearch(query, MovieState.getRequestMovieCount()),
  });

  setupLoadMoreInteraction(() => loadMoreSearchMovies(query));

  MovieState.setNextSearchPageNum(page + 1);
  paintResetList();
  paintLoadMoreButtonStatus(page !== totalPages);

  if (movies.length === 0) paintEmptyResult();
  else paintMovieList(movies);
}

export async function loadMoreSearchMovies(query: string) {
  const { page, movies, totalPages } = await getSearchMovies({
    query,
    pageNum: MovieState.getNextSearchPageNum(),
    onError: () => paintError(),
    onLoading: () => {
      paintInitialLoading(MovieState.getRequestMovieCount());
    },
  });

  MovieState.setNextSearchPageNum(page + 1);
  paintLoadMoreButtonStatus(page !== totalPages);
  paintMovieList(movies);
}
