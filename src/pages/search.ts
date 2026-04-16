import { getSearchMovies } from "../api.ts";
import { Renderer, SearchRenderer } from "../render.ts";
import { INITIAL_PAGE_NUM } from "../constants/movie.ts";
import { MovieDetail } from "./movieDetail.ts";
import State from "../state.ts";

export const Search = {
  init() {
    this.setUpSearchForm();
  },

  setUpSearchForm() {
    const searchForm = document.querySelector(".search-form");
    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();
      const input = searchForm.querySelector("input");
      if (input) {
        const searchValue = input.value;
        Search.showSearchMovies(searchValue);
      }
    });
  },

  async showSearchMovies(query: string) {
    State.isLoading = true;
    Renderer.renderSkeleton(".thumbnail-list", State.requestMovieCount);
    try {
      const {
        results: movies,
        page,
        total_pages,
      } = await getSearchMovies(query, INITIAL_PAGE_NUM);
      SearchRenderer.renderSearchResult(movies, query);
      State.nextSearchPageNum = page + 1;
      State.totalSearchPages = total_pages;
      State.searchQuery = query;
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      Renderer.renderError(err);
    } finally {
      State.isLoading = false;
    }
  },

  async showMoreSearchMovies(query: string) {
    State.isLoading = true;
    Renderer.renderSkeleton(".thumbnail-list", State.requestMovieCount);
    try {
      const {
        results: movies,
        page,
        total_pages,
      } = await getSearchMovies(query, State.nextSearchPageNum);
      State.nextSearchPageNum = page + 1;
      State.totalSearchPages = total_pages;
      Renderer.renderLoadMoreMovies(movies);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      Renderer.renderError(err);
    } finally {
      State.isLoading = false;
    }
  },
};
