import { Movie } from "../types/movie";
import MovieItem from "./MovieItem";

class MovieList {
  #parentElement: HTMLElement;
  #movies: Movie[];

  constructor(parentElement: HTMLElement, movies: Movie[]) {
    this.#parentElement = parentElement;
    this.#movies = movies;
    this.#render();
  }

  #render() {
    this.#movies.map((movie) => {
      const $list = document.createElement("li");
      new MovieItem($list, movie);
      this.#parentElement.appendChild($list);
    });
  }
}

export default MovieList;
