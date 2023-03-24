import { mostPopular, search, genre } from "./fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "./components/MovieListContainer";
import MovieList from "./components/MovieList";
import type { ResponseData } from "./types/type";
import { ConstantsNumber } from "./utils/constants";
import { onHandleCatchError, onHandleStatusError } from "./utils/errorHandler";
import MovieDetailModal from "./components/MovieDetailModal";

const MovieApp = {
  currentPageNumber: ConstantsNumber.PAGE_MIN_NUMBER,
  query: "",
  $container: <MovieListContainer>$("movie-list-container"),

  init() {
    this.$container.render();
    this.addEvent();
    this.getPopularMovieData();
  },

  addEvent() {
    $("movie-list-container")?.addEventListener(
      "fetchMovieData",
      ({ detail }: CustomEventInit) =>
        detail === "popular"
          ? this.getPopularMovieData()
          : this.getSearchMovieData()
    );
    $("movie-list-container")?.addEventListener(
      "openMovieDetail",
      ({ detail }: CustomEventInit) => {
        this.onHandleModal(detail);
      }
    );
    $("search-box")?.addEventListener(
      "searchMovieData",
      ({ detail }: CustomEventInit) => this.searchMovieData(detail)
    );
    $("movie-vote")?.addEventListener(
      "voteStarIndex",
      ({ detail }: CustomEventInit) => {
        this.onHandleModal(detail);
      }
    );
  },

  async loadMovieData(movies: ResponseData | undefined) {
    if (!movies) return;

    const movieList = <MovieList>$("movie-list");

    movieHandler.addMovies(movies.results);

    if (movies.results.length < ConstantsNumber.ROAD_IMAGE_NUMBER)
      this.$container.stopScrolling();

    movieList.render(movieHandler.movies);
  },

  async fetchMovieData(fetchFunction: () => Promise<ResponseData>) {
    try {
      const movieList = <MovieList>$("movie-list");

      movieList.displaySkeletonUI();

      const movies = await fetchFunction();

      movieList.removeSkeletonUI();

      return movies;
    } catch (error) {
      if (!(error instanceof Error)) throw error;

      const errorData = JSON.parse(error.message);
      const statusCode = errorData.status_code;

      const message = statusCode
        ? onHandleStatusError(statusCode)
        : onHandleCatchError(error.message);

      this.$container.displayErrorUI(message);
    }
  },

  async getPopularMovieData() {
    const movies = await this.fetchMovieData(() =>
      mostPopular(this.currentPageNumber++)
    );

    if (this.currentPageNumber > ConstantsNumber.PAGE_MAX_NUMBER)
      this.$container.stopScrolling();

    this.loadMovieData(movies);
  },

  async searchMovieData(query: string) {
    this.currentPageNumber = ConstantsNumber.PAGE_MIN_NUMBER;
    this.query = query;

    this.$container.changeTitle(query);

    movieHandler.initializeMovies();

    const movies = await this.fetchMovieData(() =>
      search(query, this.currentPageNumber++)
    );

    this.loadMovieData(movies);
  },

  async getSearchMovieData() {
    const movies = await this.fetchMovieData(() =>
      search(this.query, this.currentPageNumber++)
    );

    this.loadMovieData(movies);
  },

  async onHandleModal(id: number) {
    const movieDetailModal = <MovieDetailModal>$("movie-detail-modal");
    const selectedMovie = movieHandler.getSelectedMovie(id);
    const genreList = await genre();

    movieDetailModal?.render(selectedMovie, genreList);
    movieDetailModal.openModal();
  },
};

export default MovieApp;
