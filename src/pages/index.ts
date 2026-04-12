import { getPopularMovies, getGenres } from "../api.ts";
import { IndexRenderer, Renderer } from "../render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "../constants/movie.ts";
import { Search } from "./search.ts";
import { MovieDetail } from "./movieDetail.ts";
import State from "../state.ts";

export const Index = {
  init() {
    this.setUpInitialContent();
    this.setUpEventListeners();
  },

  setUpInitialContent() {
    addEventListener("load", () => this.showPopularMovies());
  },

  setUpEventListeners() {
    this.setUpLoadMoreMovies();
    this.setUpSearchForm();
    MovieDetail.setUpInitEventListeners();
  },

  setUpLoadMoreMovies() {
    const endOfThumbnailList = document.querySelector("#end-of-thumbnail-list");
    if (endOfThumbnailList) {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          if (State.isLoading) return;
          const query = State.searchQuery;
          const nextPage = query ? State.nextSearchPageNum : State.nextPageNum;
          const totalPage = query ? State.totalSearchPages : State.totalPages;
          if (totalPage === 0 || nextPage > totalPage) return;
          this.handleLoadMoreMovies();
        },
        { threshold: 0.8 },
      );
      observer.observe(endOfThumbnailList);
    }
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

  handleLoadMoreMovies() {
    const query = State.searchQuery;
    if (query) {
      Search.showMoreSearchMovies(query);
    } else {
      this.showMoreMovies();
    }
  },

  async showPopularMovies() {
    const app = document.querySelector("#app");
    if (app) {
      State.isLoading = true;
      Renderer.renderSkeleton(
        ".thumbnail-list",
        State.requestMovieCount || ONCE_MOVIE_LIMIT,
      );
      try {
        const [{ results: movies, page, total_pages }, { genres }] =
          await Promise.all([getPopularMovies(INITIAL_PAGE_NUM), getGenres()]);
        State.nextPageNum = page + 1;
        State.totalPages = total_pages;
        State.requestMovieCount = movies.length;
        State.genres = genres;
        IndexRenderer.renderInitialMovies(movies);
        MovieDetail.setUpMovieDetail(movies);
      } catch (err) {
        Renderer.renderError(err);
      } finally {
        State.isLoading = false;
      }
    }
  },

  async showMoreMovies() {
    State.isLoading = true;
    Renderer.renderSkeleton(".thumbnail-list", State.requestMovieCount);
    try {
      const {
        results: movies,
        page,
        total_pages,
      } = await getPopularMovies(State.nextPageNum);
      State.nextPageNum = page + 1;
      State.totalPages = total_pages;
      IndexRenderer.renderLoadMoreMovies(movies);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      Renderer.renderError(err);
      Renderer.clearBanner();
    } finally {
      State.isLoading = false;
    }
  },
};
