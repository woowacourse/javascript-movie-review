import { mostPopular } from "../src/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";
import MovieListContainer from "../src/components/MovieListContainer";
import MovieList from "./components/MovieList";

const movieApp = {
  currentPageNumber: 1,

  init() {
    const movieListContainer = <MovieListContainer>$("movie-list-container");
    movieListContainer.render();

    this.loadMovieData();
  },

  async loadMovieData() {
    const movies = await mostPopular(this.currentPageNumber++);
    movieHandler.addMovies(movies.results);

    const movieList = <MovieList>$("movie-list");
    movieList.render(movieHandler.movies);
  },
};

export default movieApp;
