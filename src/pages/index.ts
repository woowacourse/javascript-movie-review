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
          // 로딩시에는 가져오지 않는다.
          if (State.getIsLoading()) return;
          const query = State.getSearchQuery();
          const nextPage = query
            ? State.getNextSearchPageNum()
            : State.getNextPageNum();
          const totalPage = query
            ? State.getTotalSearchPages()
            : State.getTotalPages();
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
    const query = State.getSearchQuery();
    if (query) {
      Search.showMoreSearchMovies(query);
    } else {
      this.showMoreMovies();
    }
  },

  async showPopularMovies() {
    const app = document.querySelector("#app");
    if (app) {
      State.setIsLoading(true);
      Renderer.renderSkeleton(
        ".thumbnail-list",
        State.getRequestMovieCount() || ONCE_MOVIE_LIMIT,
      );
      try {
        const [{ results: movies, page, total_pages }, { genres }] =
          await Promise.all([getPopularMovies(INITIAL_PAGE_NUM), getGenres()]);
        State.setNextPageNum(page + 1);
        State.setTotalPages(total_pages);
        State.setRequestMovieCount(movies.length);
        State.setGenres(genres);
        IndexRenderer.renderInitialMovies(movies);
        MovieDetail.setUpMovieDetail(movies);
      } catch (err) {
        Renderer.renderError(err);
      } finally {
        State.setIsLoading(false);
      }
    }
  },

  async showMoreMovies() {
    State.setIsLoading(true);
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    try {
      const { results: movies, page } = await getPopularMovies(
        State.getNextPageNum(),
      );
      State.setNextPageNum(page + 1);
      IndexRenderer.renderLoadMoreMovies(movies);
      MovieDetail.setUpMovieDetail(movies);
    } catch (err) {
      Renderer.renderError(err);
      Renderer.clearBanner();
    } finally {
      State.setIsLoading(false);
    }
  },
};
