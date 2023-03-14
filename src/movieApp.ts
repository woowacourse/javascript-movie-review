import { mostPopular } from "../src/fetch";
import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";

const movieApp = {
  async init() {
    const movies = await mostPopular(1);
    movieHandler.addMovies(movies.results);
    // console.log(movieHandler.movies);

    const movieListContainer = <MovieListContainer>$("movie-list-container");
    movieListContainer.render();

    const movieList = $("movie-list") as any;
    movieList.render(movieHandler.movies);
  },
};

export default movieApp;
