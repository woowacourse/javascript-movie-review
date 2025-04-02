import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
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

      new MovieItem($list, movie, () => this.#handleClickMovieItem(movie.id));

      this.#parentElement.appendChild($list);
    });
  }

  #handleClickMovieItem = (id: number) => {
    const $body = document.querySelector("body");
    const $modalBackground = document.querySelector(".modal-background");
    if (!isHTMLElement($modalBackground) || !isHTMLElement($body)) return;

    this.#modal.show(id);
    $modalBackground.classList.add("active");
    $body.classList.add("active");
  };
}

export default MovieList;
