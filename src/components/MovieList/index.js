// components/MovieListComponent.js
import store from "../../store/store.ts";
import movieListTemplate from "./movieListTemplate.js";
import { attachMoreButtonEvent } from "../MoreButton/MoreButton.js";

class MovieList {
  constructor($container) {
    this.$container = $container;
    store.subscribe(this.render.bind(this));
    this.render(store.getState());
  }

  render(state) {
    this.$container.innerHTML = movieListTemplate({
      movies: state.movies,
      query: state.query,
      searchedMoviesLength: state.searchedMoviesLength,
    });
    attachMoreButtonEvent();
  }
}

export default MovieList;
