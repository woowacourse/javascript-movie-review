import { getPopularMovies, getSearchMovies } from "./api.ts";
import Renderer from "./render.ts";
import { observeHeaderScroll } from "./observer.ts";
import State from "./state.ts";

const ONCE_MOVIE_LIMIT = 20;
const INITIAL_PAGE_NUM = 1;

async function loadInitialMovie() {
  const app = document.querySelector("#app");
  if (app) {
    await getPopularMovies({
      pageNum: INITIAL_PAGE_NUM,
      onSuccess: ({ page, results: movies }) => {
        State.setNextPageNum(page + 1);
        State.setRequestMovieCount(movies.length);
        const movieList = document.querySelector(".thumbnail-list");
        const loadMoreButton = document.querySelector(".load-more-button");
        const banner = document.querySelector(".banner-container");

        if (banner) {
          Renderer.renderBanner(banner, movies[0]);
          observeHeaderScroll();
        }
        if (movieList) {
          Renderer.clearSkeleton(movieList);
          Renderer.renderMovies(movieList, movies);
        }
        if (loadMoreButton)
          loadMoreButton.addEventListener("click", loadMoreMovies);

        Renderer.renderSectionHeading();
      },
      onLoading: () => {
        const movieList = document.querySelector(".thumbnail-list");
        if (movieList)
          Renderer.renderSkeleton(
            movieList,
            State.getRequestMovieCount() || ONCE_MOVIE_LIMIT,
          );
      },
      onError: (_) => {
        const main = document.querySelector("main");
        if (main)
          Renderer.renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
      },
    });
  }
}

async function loadMoreMovies() {
  await getPopularMovies({
    pageNum: State.getNextPageNum(),
    onSuccess: ({ page, results: movies }) => {
      const movieList = document.querySelector(".thumbnail-list");
      const haveRestPage = movies.length === ONCE_MOVIE_LIMIT;
      State.setNextPageNum(page + 1);
      if (haveRestPage) Renderer.showLoadMoreButton();
      if (movieList) {
        Renderer.clearSkeleton(movieList);
        Renderer.renderMovies(movieList, movies);
      }
    },
    onError: function (_): void {
      const section = document.querySelector("section");
      if (section)
        Renderer.renderError(section, "영화 정보를 불러오는 데 실패했습니다.");
      Renderer.clearBanner();
    },
    onLoading: function (): void {
      const ul = document.querySelector(".thumbnail-list");
      if (ul) Renderer.renderSkeleton(ul, State.getRequestMovieCount());
      Renderer.hideLoadMoreButton();
    },
  });
}

async function loadSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: INITIAL_PAGE_NUM,
    onSuccess: ({ page, results: movies }) => {
      const loadMoreButton = document.querySelector(".load-more-button");
      const haveRestPage = movies.length === ONCE_MOVIE_LIMIT;
      if (loadMoreButton) {
        loadMoreButton.removeEventListener("click", loadMoreMovies);
        loadMoreButton.addEventListener("click", () =>
          loadMoreSearchMovies(query),
        );
      }
      State.setNextSearchPageNum(page + 1);
      Renderer.clearBanner();
      Renderer.clearMovies();
      Renderer.clearEmptyResult();
      Renderer.renderSearchSectionHeading(query);
      if (haveRestPage) Renderer.showLoadMoreButton();
      if (movies.length === 0) Renderer.renderEmptyResult();
      else Renderer.renderSearchMovies(movies);
    },
    onError: function (_): void {
      const main = document.querySelector("main");
      if (main)
        Renderer.renderError(main, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const movieList = document.querySelector(".thumbnail-list");
      if (movieList)
        Renderer.renderSkeleton(movieList, State.getRequestMovieCount());
      Renderer.hideLoadMoreButton();
    },
  });
}

async function loadMoreSearchMovies(query: string) {
  await getSearchMovies({
    query,
    pageNum: State.getNextSearchPageNum(),
    onSuccess: ({ page, results: movies }) => {
      const movieList = document.querySelector(".thumbnail-list");
      State.setNextSearchPageNum(page + 1);
      if (movieList) {
        Renderer.clearSkeleton(movieList);
        Renderer.renderSearchMovies(movies);
      }
    },
    onError: function (_): void {
      const section = document.querySelector("section");
      if (section)
        Renderer.renderError(section, "영화 정보를 불러오는 데 실패했습니다.");
    },
    onLoading: function (): void {
      const movieList = document.querySelector(".thumbnail-list");
      if (movieList)
        Renderer.renderSkeleton(movieList, State.getRequestMovieCount());
    },
  });
}

const searchForm = document.querySelector(".search-form");
searchForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = searchForm.querySelector("input");
  if (input) {
    const searchValue = input.value;
    loadSearchMovies(searchValue);
  }
});

addEventListener("load", loadInitialMovie);
