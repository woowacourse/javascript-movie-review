import { mostPopular, search } from "./api/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "../src/components/MovieListContainer";
import MovieList from "./components/MovieList";
import type { Movie, ResponseData } from "./types/type";

const movieApp = {
  currentPageNumber: 1,
  query: "",
  $container: <MovieListContainer>$("movie-list-container"),

  init() {
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

  async loadMovieData(movies: ResponseData) {
    const movieList = <MovieList>$("movie-list");
    if (!movies) return;

    movieHandler.addMovies(movies.results);

    if (movies.results.length < 20) this.$container.removeLoadMovieButton();

    movieList.render(movieHandler.movies);
  },

  async fetchMovieData(fetchFunction: () => Promise<ResponseData>) {
    const movieList = <MovieList>$("movie-list");

    movieList.displaySkeletonUI();

    const movies = await fetchFunction();

    if (!movies) this.$container.displayErrorUI();

    return movies;
  },

  async getPopularMovieData() {
    const movies = await this.fetchMovieData(() =>
      mostPopular(this.currentPageNumber++)
    );

    if (this.currentPageNumber > 500) this.$container.removeLoadMovieButton();

    this.loadMovieData(movies);
  },

  async searchMovieData(query: string) {
    this.currentPageNumber = 1;
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
};

export default movieApp;
