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

  async loadSearchMovies(query: string) {
    const {
      results: movies,
      page,
      total_pages,
    } = await getSearchMovies(query, INITIAL_PAGE_NUM);
    State.nextSearchPageNum = page + 1;
    State.totalSearchPages = total_pages;
    State.searchQuery = query;

    return movies
  },

  async loadSearchMoreMovies(query: string) {
    const {
      results: movies,
      page,
      total_pages,
    } = await getSearchMovies(query, State.nextSearchPageNum);
    State.nextSearchPageNum = page + 1;
    State.totalSearchPages = total_pages;
    return movies;
  },

  async showSearchMovies(query: string) {
    State.isLoading = true;
    Renderer.renderSkeleton(".thumbnail-list", State.requestMovieCount);
    try {
      const movies = await this.loadSearchMovies(query);
      SearchRenderer.renderSearchResult(movies, query);
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
      const movies = await this.loadSearchMoreMovies(query);
      Renderer.renderLoadMoreMovies(movies);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      Renderer.renderError(err);
    } finally {
      State.isLoading = false;
    }
  },
};
