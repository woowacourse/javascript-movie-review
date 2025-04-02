import { Movie } from "../types/movie";
import MovieDetailModal from "./MovieDetailModal";
import MovieItem from "./MovieItem";

class MovieList {
  #parentElement: HTMLElement;
  #modal: MovieDetailModal;
  #movies: Movie[];

  constructor(parentElement: HTMLElement, movies: Movie[]) {
    this.#parentElement = parentElement;
    const $modalBackground = document.querySelector(".modal-background");
    this.#modal = new MovieDetailModal($modalBackground as HTMLElement);
    this.#movies = movies;
    this.#render();
  }

  #render() {
    this.#movies.map((movie) => {
      const $list = document.createElement("li");

      new MovieItem($list, movie, this.#modal);

      this.#parentElement.appendChild($list);
    });
  }
}

export default MovieList;
