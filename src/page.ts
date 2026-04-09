import { getPopularMovies, getSearchMovies } from "./api.ts";
import { observeHeaderScroll } from "./observer.ts";
import MovieState from "./state/business/movieState.ts";
import { setupLoadMoreInteraction } from "./ui/business/interactor.ts";
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
import { getSearchFormElement } from "./ui/domain/movieElement.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

export async function loadInitialMovie() {
  const {
    page,
    results: movies,
    total_pages,
  } = await getPopularMovies({
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
  paintLoadMoreButtonStatus(page !== total_pages);
}

export async function loadMoreMovies() {
  const {
    page,
    results: movies,
    total_pages,
  } = await getPopularMovies({
    pageNum: MovieState.getNextPageNum(),
    onError: () => {
      paintError();
      paintClearBanner();
    },
    onLoading: () => paintInitialLoading(MovieState.getRequestMovieCount()),
  });

  MovieState.setNextPageNum(page + 1);
  paintLoadMoreButtonStatus(page !== total_pages);
  paintMovieList(movies);
}

export async function loadSearchMovies(query: string) {
  const {
    page,
    results: movies,
    total_pages,
  } = await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onError: () => paintError(),
    onLoading: () =>
      paintPrepareSearch(query, MovieState.getRequestMovieCount()),
  });

  setupLoadMoreInteraction(() => loadMoreSearchMovies(query));

  MovieState.setNextSearchPageNum(page + 1);
  paintResetList();
  paintLoadMoreButtonStatus(page !== total_pages);

  if (movies.length === 0) {
    paintEmptyResult();
  } else {
    paintMovieList(movies);
  }
}

export async function loadMoreSearchMovies(query: string) {
  const {
    page,
    results: movies,
    total_pages,
  } = await getSearchMovies({
    query,
    pageNum: MovieState.getNextSearchPageNum(),
    onError: () => paintError(),
    onLoading: () => {
      paintInitialLoading(MovieState.getRequestMovieCount());
    },
  });

  MovieState.setNextSearchPageNum(page + 1);
  paintLoadMoreButtonStatus(page !== total_pages);
  paintMovieList(movies);
}

const searchForm = getSearchFormElement();
searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = searchForm.querySelector("input");
  if (input) {
    const searchValue = input.value;
    loadSearchMovies(searchValue);
  }
});
