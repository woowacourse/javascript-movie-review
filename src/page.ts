import { getPopularMovies, getSearchMovies } from "./api.ts";
import State from "./state.ts";
import { setupLoadMoreInteraction } from "./ui/business/interactor.ts";
import {
  paintClearBanner,
  paintClearEmptyResult,
  paintClearMovies,
  paintEmptyResult,
  paintError,
  paintHomeSectionHeading,
  paintInitialLoading,
  paintLoadMoreButtonStatus,
  paintMovieBanner,
  paintMovieList,
  paintSearchSectionHeading,
} from "./ui/business/painter.ts";
import {
  getLoadMoreButtonElement,
  getMovieListElement,
  getSearchFormElement,
} from "./ui/domain/movieElement.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

let currentSearchHandler: (() => void) | null = null;

/**
 * 초기 영화 목록을 로드하고 UI를 구성합니다. (App Orchestration)
 */
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
      const loadMoreButton = getLoadMoreButtonElement();
      if (loadMoreButton) {
        loadMoreButton.removeEventListener("click", loadMoreMovies);
        if (currentSearchHandler) {
          loadMoreButton.removeEventListener("click", currentSearchHandler);
        }
        currentSearchHandler = () => loadMoreSearchMovies(query);
        loadMoreButton.addEventListener("click", currentSearchHandler);
      }
      State.setNextSearchPageNum(page + 1);
      paintClearBanner();
      paintClearMovies();
      paintClearEmptyResult();
      paintLoadMoreButtonStatus(page !== total_pages);
      if (movies.length === 0) paintEmptyResult();
      else paintMovieList(movies);
    },
    onError: () => {
      paintError();
    },
    onLoading: () => {
      paintInitialLoading(State.getRequestMovieCount());
      paintSearchSectionHeading(query);
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
