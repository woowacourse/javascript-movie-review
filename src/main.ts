import { getPopularMovies, getSearchMovies, getGenres, Movie } from "./api.ts";
import { MovieRenderer, Renderer } from "./render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "./constans/movie.ts";
import State from "./state.ts";

const App = {
  init() {
    this.setUpInitialContent();
    this.setUpEventListeners();
  },

  setUpInitialContent() {
    addEventListener("load", () => this.showPopularMovies());
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

  setUpMovieDetail(moviesData: Movie[]) {
    // 이미 렌더링된 영화는 제외한다.
    const movieList = [
      ...document.querySelectorAll(".thumbnail-list li"),
    ].slice(-moviesData.length);
    movieList.forEach((movie, idx) => {
      movie.addEventListener("click", (e) => {
        e.preventDefault();
        const dialog = document.querySelector("dialog");
        dialog?.showModal();
      });
    });
    // const genres = State.getGenres();
    // movieList.forEach((movie, idx) => {
    //   movie.addEventListener("click", (e) => {
    //     e.preventDefault();
    //     const movieData = moviesData[idx];
    //     // 장르 ID를 이름으로 변경한다.
    //     const movieGenres = movieData.genre_ids.map(
    //       (genreId) => genres.find((genre) => genre.id === genreId)!.name,
    //     );
    //     Renderer.renderMovieDetail(
    //       movieData,
    //       new Date(movieData.release_date).getFullYear(),
    //       movieGenres,
    //     );
    //   });
    // });
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
        const [{ results: movies, page }, { genres }] = await Promise.all([
          getPopularMovies(INITIAL_PAGE_NUM),
          getGenres(),
        ]);
        State.setNextPageNum(page + 1);
        State.setRequestMovieCount(movies.length);
        State.setGenres(genres);
        MovieRenderer.renderInitialMovies(movies);
        this.setUpMovieDetail(movies);
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
      this.setUpMovieDetail(movies);
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
      this.setUpMovieDetail(movies);
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
      this.setUpMovieDetail(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
    }
  },
};

App.init();
