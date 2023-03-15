import { mostPopular, search } from "../src/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "../src/components/MovieListContainer";
import MovieList from "./components/MovieList";
import type { Movie } from "./types/type";

const movieApp = {
  currentPageNumber: 1,
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
    $("search-box")?.addEventListener(
      "searchMovieData",
      ({ detail }: CustomEventInit) => this.searchMovieData(detail)
    );
  },

  async loadMovieData(movies: Movie[]) {
    const movieList = <MovieList>$("movie-list");

    movieHandler.addMovies(movies);

    if (movies.length < 20) this.$container.removeLoadMovieButton();

    movieList.render(movieHandler.movies);
  },

  async getPopularMovieData() {
    const movieList = <MovieList>$("movie-list");

    movieList.displaySkeletonUI();

    const movies = await mostPopular(this.currentPageNumber++);
    if (!movies) this.$container.displayErrorUI();

    if (this.currentPageNumber > 500) this.$container.removeLoadMovieButton();

    this.loadMovieData(movies.results);
  },

  async searchMovieData(query: string) {
    this.currentPageNumber = 1;
    this.query = query;

    const movieList = <MovieList>$("movie-list");

    movieList.displaySkeletonUI();

    const movies = await search(query, this.currentPageNumber++);
    if (!movies) this.$container.displayErrorUI();

    this.$container.changeTitle(query);

    movieHandler.initializeMovies();
    this.loadMovieData(movies.results);
  },

  async getSearchMovieData() {
    const movieList = <MovieList>$("movie-list");

    movieList.displaySkeletonUI();
    const movies = await search(this.query, this.currentPageNumber++);
    if (!movies) this.$container.displayErrorUI();

    this.loadMovieData(movies.results);
  },
};

export default movieApp;
