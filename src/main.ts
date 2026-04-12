import { getPopularMovies, getSearchMovies, getGenres, Movie } from "./api.ts";
import { MovieRenderer, Renderer } from "./render.ts";
import { ONCE_MOVIE_LIMIT, INITIAL_PAGE_NUM } from "./constants/movie.ts";
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
    this.setUpLoadMoreMovies();
    this.setUpSearchForm();
    this.setUpDialogCloser();
    this.setUpMyRatingToMovie();
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
          console.log(nextPage);
          console.log(totalPage);
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
        this.showSearchMovies(searchValue);
      }
    });
  },

  setUpDialogCloser() {
    const dialog = document.querySelector("dialog");
    const dialogCloser = document.querySelector("#closeModal");
    dialogCloser?.addEventListener("click", () => {
      if (dialog) dialog.close();
    });
  },

  setUpMovieDetail(moviesData: Movie[]) {
    // 이미 렌더링된 영화는 제외한다.
    const movieList = [
      ...document.querySelectorAll(".thumbnail-list li"),
    ].slice(-moviesData.length);
    const genres = State.getGenres();
    movieList.forEach((movie, idx) => {
      movie.addEventListener("click", (e) => {
        e.preventDefault();
        const dialog = document.querySelector("dialog");
        const movieData = moviesData[idx];
        const movieGenres = movieData.genre_ids.map(
          (genreId) => genres.find((genre) => genre.id === genreId)!.name,
        );
        const rating = Number(
          localStorage.getItem(`movie-${movieData.id}-my-rating`),
        );
        MovieRenderer.renderMovieDetail(
          movieData,
          new Date(movieData.release_date).getFullYear(),
          movieGenres,
          rating ? rating : 0,
        );
        dialog?.showModal();
      });
    });
  },

  setUpMyRatingToMovie() {
    const ratingButtons = document.querySelectorAll(
      ".modal .my-rating-container button",
    );
    ratingButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const myRating = String(
          (e.currentTarget as HTMLElement).dataset.rating,
        );
        const movieContainer = document.querySelector(
          "#movie-detail-container",
        );
        const movieId = (movieContainer as HTMLElement).dataset.movieId;
        localStorage.setItem(`movie-${movieId}-my-rating`, myRating);
        MovieRenderer.renderMyRating(myRating ? Number(myRating) : 0);
      });
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
        MovieRenderer.renderInitialMovies(movies);
        this.setUpMovieDetail(movies);
      } catch (err) {
        MovieRenderer.renderError(err);
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
      MovieRenderer.renderLoadMoreMovies(movies);
      this.setUpMovieDetail(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
      Renderer.clearBanner();
    } finally {
      State.setIsLoading(false);
    }
  },

  async showSearchMovies(query: string) {
    State.setIsLoading(true);
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
    try {
      const {
        results: movies,
        page,
        total_pages,
      } = await getSearchMovies(query, INITIAL_PAGE_NUM);
      MovieRenderer.renderSearchResult(movies, query);
      State.setNextSearchPageNum(page + 1);
      State.setTotalSearchPages(total_pages);
      State.setSearchQuery(query);
      this.setUpMovieDetail(movies);
    } catch (err) {
      MovieRenderer.renderError(err);
    } finally {
      State.setIsLoading(false);
    }
  },

  async showMoreSearchMovies(query: string) {
    State.setIsLoading(true);
    Renderer.renderSkeleton(".thumbnail-list", State.getRequestMovieCount());
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
    } finally {
      State.setIsLoading(false);
    }
  },
};

App.init();
