import { getPopularMovies, getSearchMovies } from "./api.ts";
import { observeHeaderScroll } from "./observer.ts";
import State from "./state.ts";
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

  State.setNextPageNum(page + 1);
  State.setRequestMovieCount(movies.length);

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
  await getPopularMovies({
    pageNum: State.getNextPageNum(),
    onSuccess: ({ page, results: movies, total_pages }) => {
      State.setNextPageNum(page + 1);
      paintLoadMoreButtonStatus(page !== total_pages);
      paintMovieList(movies);
    },
    onError: () => {
      paintError();
      paintClearBanner();
    },
    onLoading: () => {
      paintInitialLoading(State.getRequestMovieCount());
    },
  });
}

export async function loadSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onSuccess: ({ page, results: movies, total_pages }) => {
      setupLoadMoreInteraction(() => loadMoreSearchMovies(query));

      State.setNextSearchPageNum(page + 1);
      paintResetList();
      paintLoadMoreButtonStatus(page !== total_pages);

      if (movies.length === 0) {
        paintEmptyResult();
      } else {
        paintMovieList(movies);
      }
    },
    onError: () => {
      paintError();
    },
    onLoading: () => {
      paintPrepareSearch(query, State.getRequestMovieCount());
    },
  });
}

export async function loadMoreSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: State.getNextSearchPageNum(),
    onSuccess: ({ page, results: movies, total_pages }) => {
      State.setNextSearchPageNum(page + 1);
      paintLoadMoreButtonStatus(page !== total_pages);
      paintMovieList(movies);
    },
    onError: () => {
      paintError();
    },
    onLoading: () => {
      paintInitialLoading(State.getRequestMovieCount());
    },
  });
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
