import { getPopularMovies, getSearchMovies } from "./api.ts";
import { MovieRenderer, Renderer } from "./render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "./constans/movie.ts";
import State from "./state.ts";

const App = {
  init() {
    this.setUpInitialContent();
    this.setUpEventListeners();
  },

  setUpInitialContent() {
    addEventListener("load", this.showPopularMovies);
  },

  setUpEventListeners() {
    this.setUpLoadMoreButton();
    this.setUpSearchForm();
  },

  setUpLoadMoreButton() {
    const loadMoreButton = document.querySelector(".load-more-button");
    if (loadMoreButton)
      loadMoreButton.addEventListener("click", () =>
        this.handleLoadMoreMovies(),
      );
  },

  setUpSearchForm() {
    const searchForm = document.querySelector(".search-form");
    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = searchForm.querySelector("input");
      if (input) {
        const searchValue = input.value;
        this.showSearchMovies(searchValue);
      }
    });
  },

  handleLoadMoreMovies() {
    const query = State.getSearchQuery();
    if (query) {
      this.showMoreSearchMovies(query);
    } else {
      this.showMoreMovies();
    }
  },

  async showPopularMovies() {
    const app = document.querySelector("#app");
    if (app) {
      Renderer.renderSkeleton(
        ".thumbnail-list",
        State.getRequestMovieCount() || ONCE_MOVIE_LIMIT,
      );
      try {
        const { results: movies, page } =
          await getPopularMovies(INITIAL_PAGE_NUM);
        State.setNextPageNum(page + 1);
        State.setRequestMovieCount(movies.length);
        MovieRenderer.renderInitialMovies(movies);
      } catch (err) {
        MovieRenderer.renderError(err);
      }
    }
  },

  async showMoreMovies() {
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    Renderer.hideLoadMoreButton();
    try {
      const { results: movies, page } = await getPopularMovies(
        State.getNextPageNum(),
      );
      State.setNextPageNum(page + 1);
      MovieRenderer.renderLoadMoreMovies(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
      Renderer.clearBanner();
    }
  },

  async showSearchMovies(query: string) {
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    Renderer.hideLoadMoreButton();
    try {
      const { results: movies, page } = await getSearchMovies(
        query,
        INITIAL_PAGE_NUM,
      );
      MovieRenderer.renderSearchResult(movies, query);
      State.setNextSearchPageNum(page + 1);
      State.setSearchQuery(query);
    } catch (err) {
      MovieRenderer.renderError(err);
    }
  },

  async showMoreSearchMovies(query: string) {
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    Renderer.hideLoadMoreButton();
    try {
      const { results: movies, page } = await getSearchMovies(
        query,
        State.getNextSearchPageNum(),
      );
      State.setNextSearchPageNum(page + 1);
      MovieRenderer.renderLoadMoreSearchMovies(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
    }
  },
};

App.init();
