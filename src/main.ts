import { getPopularMovies, getSearchMovies } from "./api.ts";
import { MovieRenderer, Renderer } from "./render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "./constans/movie.ts";
import State from "./state.ts";

async function loadInitialMovie() {
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
      const loadMoreButton = document.querySelector(".load-more-button");
      if (loadMoreButton)
        loadMoreButton.addEventListener("click", loadMoreMovies);
    } catch (err) {
      MovieRenderer.renderError();
    }
  }
}

async function loadMoreMovies() {
  Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
  Renderer.hideLoadMoreButton();
  try {
    const { results: movies, page } = await getPopularMovies(
      State.getNextPageNum(),
    );
    State.setNextPageNum(page + 1);
    MovieRenderer.renderLoadMoreMovies(movies);
  } catch (err) {
    MovieRenderer.renderError();
    Renderer.clearBanner();
  }
}

async function loadSearchMovies(query: string) {
  Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
  Renderer.hideLoadMoreButton();
  try {
    const { results: movies, page } = await getSearchMovies(
      query,
      INITIAL_PAGE_NUM,
    );
    const loadMoreButton = document.querySelector(".load-more-button");
    MovieRenderer.renderSearchResult(movies, query);
    State.setNextSearchPageNum(page + 1);
    if (loadMoreButton) {
      loadMoreButton.removeEventListener("click", loadMoreMovies);
      loadMoreButton.addEventListener("click", () =>
        loadMoreSearchMovies(query),
      );
    }
  } catch (err) {
    MovieRenderer.renderError();
  }
}

async function loadMoreSearchMovies(query: string) {
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
    MovieRenderer.renderError();
  }
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
