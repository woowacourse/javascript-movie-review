import {
  getMostPopularMovies,
  getSearchMovies,
  getMovieGenres,
} from "./api/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "../src/components/MovieListContainer";
import MovieList from "./components/MovieList";
import type { Movie, ResponseData } from "./types/type";
import { errorHandler } from "./utils/errorHandler";
import CustomModal from "./components/CustomModal";
import MovieDetail from "./components/MovieDetail";
import { getLocalStorage, setLocalStorage } from "./utils/localStorage";

const movieApp = {
  currentPageNumber: 1,
  query: "",
  $container: <MovieListContainer>$("movie-list-container"),

  init() {
    this.addEvent();
    this.setMovieGenres();
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
    $("search-box")?.addEventListener(
      "searchMovieData",
      ({ detail }: CustomEventInit) => this.searchMovieData(detail)
    );
    $("movie-list-container")?.addEventListener(
      "clickMovieDetail",
      ({ detail }: CustomEventInit) => this.renderModal(detail)
    );
    $("custom-modal")?.addEventListener(
      "setMovieScore",
      ({ detail }: CustomEventInit) => this.setMovieScore(detail)
    );
  },

  renderModal(movieID: string) {
    const modal = <CustomModal>$("custom-modal");
    const movieDetail = <MovieDetail>$("movie-detail");

    const original = getLocalStorage("moviesScore") ?? [];
    const existMovie = original.find(
      (movie: { movieId: string; score: string }) => movie.movieId === movieID
    );

    movieDetail.render(
      movieHandler.getMovie(Number(movieID)),
      existMovie?.score
    );

    modal.openModal();
  },

  setMovieScore({ movieId, score }: { movieId: string; score: string }) {
    const original = getLocalStorage("moviesScore") ?? [];
    const existMovie = original.find(
      (movie: { movieId: string; score: string }) => movie.movieId === movieId
    );

    if (score === "0") return;
    if (existMovie) {
      existMovie.score = score;
      setLocalStorage("moviesScore", [...original]);
    } else {
      setLocalStorage("moviesScore", [...original, { movieId, score }]);
    }
  },

  async setMovieGenres() {
    const genres = await getMovieGenres();
    movieHandler.setGenres(genres.genres);
  },

  renderMovieList(movies: ResponseData | undefined) {
    const movieList = <MovieList>$("movie-list");

    if (!movies) return;

    const newMovies = movieHandler.addMovies(movies.results);

    if (movies.results.length < 20) this.$container.removeLoadMovieButton();

    this.$container.hideSkeletonUI();
    movieList.render(newMovies);
  },

  searchMovieData(query: string) {
    this.currentPageNumber = 1;
    this.query = query;

    this.$container.changeTitle(query);

    movieHandler.initializeMovies();
    this.getSearchMovieData();
  },

  async fetchMovieData(fetchFunction: () => Promise<ResponseData>) {
    const movieList = <MovieList>$("movie-list");

    this.$container.showSkeletonUI();
    try {
      const movies = await fetchFunction();

      return movies;
    } catch (error) {
      if (error instanceof Error) {
        const errorMessage = errorHandler(error.message);

        this.$container.displayErrorUI(errorMessage);
      }
    }
  },

  async getPopularMovieData() {
    const movies = await this.fetchMovieData(() =>
      getMostPopularMovies(this.currentPageNumber++)
    );

    if (this.currentPageNumber > 500) this.$container.removeLoadMovieButton();

    this.renderMovieList(movies);
  },

  async getSearchMovieData() {
    const movies = await this.fetchMovieData(() =>
      getSearchMovies(this.query, this.currentPageNumber++)
    );

    this.renderMovieList(movies);
  },
};

export default movieApp;
