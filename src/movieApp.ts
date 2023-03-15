import { mostPopular, search } from "../src/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "../src/components/MovieListContainer";
import MovieList from "./components/MovieList";

const movieApp = {
  currentPageNumber: 1,

  init() {
    const movieListContainer = <MovieListContainer>$("movie-list-container");
    movieListContainer.render();

    this.addEvent();
    this.loadMovieData();
  },

  addEvent() {
    $("movie-list-container")?.addEventListener("fetchMovieData", () =>
      this.loadMovieData()
    );
    $("search-box")?.addEventListener(
      "searchMovieData",
      ({ detail }: CustomEventInit) => this.searchMovieData(detail)
    );
  },

  async loadMovieData() {
    const movies = await mostPopular(this.currentPageNumber++);
    movieHandler.addMovies(movies.results);

    const movieList = <MovieList>$("movie-list");
    movieList.render(movieHandler.movies);
  },

  async searchMovieData(query: string) {
    this.currentPageNumber = 1;
    const movies = await search(query, this.currentPageNumber);

    movieHandler.initializeMovies();
    movieHandler.addMovies(movies.results);

    const movieList = <MovieList>$("movie-list");
    movieList.render(movieHandler.movies);
  },
};

export default movieApp;
