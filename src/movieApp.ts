import movieHandler from "./domain/movieHandler";
import { $ } from "./utils/dom";

const movieApp = {
  async init() {
    const movies = await movieHandler.getPopularMovies();

    const movieListContainer = <MovieListContainer>$("movie-list-container");
    movieListContainer.render();

    const movieList = $("movie-list") as any;
    movieList.render(movies);
  },
};

export default movieApp;
