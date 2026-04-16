import { getPopularMovies } from "../api.ts";
import { IndexRenderer, Renderer } from "../render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "../constants/movie.ts";
import { Search } from "./search.ts";
import { MovieDetail } from "./movieDetail.ts";
import State from "../state.ts";

export const Index = {
  init() {
    this.setUpInitialContent();
    this.setUpLoadMoreMovies();
  },

  setUpInitialContent() {
    addEventListener("load", () => this.showPopularMovies());
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

  handleLoadMoreMovies() {
    const query = State.searchQuery;
    if (query) {
      Search.showMoreSearchMovies(query);
    } else {
      this.showMoreMovies();
    }
  },

  async loadInitialData() {
    const { results: movies, page, total_pages } = await getPopularMovies(INITIAL_PAGE_NUM);

    State.nextPageNum = page + 1;
    State.totalPages = total_pages;
    State.requestMovieCount = movies.length;
    return movies;
  },

  async loadMoreMovies() {
    const {
        results: movies,
        page,
        total_pages,
      } = await getPopularMovies(State.nextPageNum);
    State.nextPageNum = page + 1;
    State.totalPages = total_pages;
    return movies;
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
        const movies = await this.loadInitialData();
        IndexRenderer.renderInitialMovies(movies);
        MovieDetail.setUpMovieDetail();
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
      const movies = await this.loadMoreMovies()
      Renderer.renderLoadMoreMovies(movies);
      MovieDetail.setUpMovieDetail();
    } catch (err) {
      Renderer.renderError(err);
      Renderer.clearBanner();
    } finally {
      State.isLoading = false;
    }
  },
};
