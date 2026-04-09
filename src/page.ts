import { getPopularMovies, getSearchMovies } from "./apis/api.ts";
import MovieState from "./state/business/movieState.ts";
import { setupSearchInteraction } from "./ui/business/interactor.ts";
import {
  paintClearBanner,
  paintEmptyResult,
  paintError,
  paintHomeSectionHeading,
  paintInitialLoading,
  paintInView,
  paintMovieBanner,
  paintMovieList,
  paintPrepareSearch,
  paintResetList,
} from "./ui/business/painter.ts";
import {
  observeHeaderScroll,
  observeLoadMoreScroll,
} from "./ui/domain/observer.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

export async function loadInitialMovie() {
  const { movies, page } = await getPopularMovies({
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
    paintInView();
  }

  const disconnect = observeLoadMoreScroll(loadMoreMovies);

  if (disconnect)
    setupSearchInteraction((query: string) => {
      loadSearchMovies(query);
      disconnect && disconnect();
    });
}

export async function loadMoreMovies() {
  const { page, movies } = await getPopularMovies({
    pageNum: MovieState.getNextPageNum(),
    onError: () => {
      paintError();
      paintClearBanner();
    },
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextPageNum(page + 1);
  paintMovieList(movies);
}

let disconnectSearchScroll: (() => void) | undefined;

export async function loadSearchMovies(query: string) {
  disconnectSearchScroll?.();

  const { page, movies } = await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onError: () => paintError(),
    onLoading: () =>
      paintPrepareSearch(query, MovieState.getRequestMovieCount()),
  });

  disconnectSearchScroll = observeLoadMoreScroll(() =>
    loadMoreSearchMovies(query),
  );

  MovieState.setNextSearchPageNum(page + 1);
  paintResetList();

  if (movies.length === 0) paintEmptyResult();
  else paintMovieList(movies);
}

export async function loadMoreSearchMovies(query: string) {
  const { page, movies } = await getSearchMovies({
    query,
    pageNum: MovieState.getNextSearchPageNum(),
    onError: () => paintError(),
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextSearchPageNum(page + 1);
  paintMovieList(movies);
}
