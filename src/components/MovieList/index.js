import movieListTemplate from "./movieListTemplate.js";
import { attachMoreButtonEvent } from "../MoreButton/MoreButton.js";

class MovieList {
  #$container;
  #store;

  constructor($container, store) {
    this.#$container = $container;
    this.#store = store;
    this.#store.subscribe(this.render.bind(this));
    this.render(this.#store.getState());
  }

  render(state) {
    this.#$container.innerHTML = movieListTemplate({
      movies: state.movies,
      query: state.query,
      searchedMoviesLength: state.searchedMoviesLength,
    });
    attachMoreButtonEvent(this.#store);
  }
}

export default MovieList;
