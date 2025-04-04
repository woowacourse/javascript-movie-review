import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import MovieDetailModal from "./MovieDetailModal";
import MovieItem from "./MovieItem";
import Skeleton from "./Skeleton";

class MovieList {
  #parentElement: HTMLElement;
  #Modal!: MovieDetailModal;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#initComponents();
  }

  #initComponents(): void {
    const $modalBackground = document.querySelector(".modal-background");
    this.#Modal = new MovieDetailModal($modalBackground as HTMLElement);
  }

  init() {
    this.#parentElement.innerHTML = "";
  }

  render({
    status,
    movies,
  }: {
    status: "loading" | "success";
    movies?: Movie[];
  }) {
    if (status === "loading") {
      this.#parentElement.innerHTML = /*html*/ `${Skeleton.MovieList}`;
      return;
    }

    if (!movies) return;

    const fragment = document.createDocumentFragment();

    movies.forEach((movie) => {
      const $list = document.createElement("li");
      new MovieItem($list, movie, (id: number) => {
        this.#showModal(id);
      });
      fragment.appendChild($list);
    });

    this.#parentElement.appendChild(fragment);
  }

  #showModal(id: number): void {
    this.#Modal.show(id);
  }
}

export default MovieList;
