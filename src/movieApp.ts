import { mostPopular } from "../src/fetch";
import { $ } from "./utils/dom";

const movieApp = {
  async init() {
    const movies = await mostPopular(1);
    console.log(movies);

    const movieListContainer = <MovieListContainer>$("movie-list-container");
    movieListContainer.render();

    const movieList = $("movie-list") as any;
    movieList.render(movies.results);
  },
};

export default movieApp;
