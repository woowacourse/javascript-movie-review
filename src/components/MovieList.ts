import { APIData } from "../types/apiData";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import Modal from "./modal/Modal";
// import MovieDetailModal from "./modal/MovieDetailModal";
import MovieDetailModalStrategy from "./modal/MovieDetailModalStrategy";
import MovieItem from "./MovieItem";
import Skeleton from "./Skeleton";

class MovieList {
  #parentElement: HTMLElement;
  #Modal!: Modal;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#initComponents();
  }

  #initComponents(): void {
    const $modalBackground = document.querySelector(".modal-background");
    if (isHTMLElement($modalBackground))
      this.#Modal = new Modal($modalBackground, new MovieDetailModalStrategy());
  }

  init() {
    this.#parentElement.innerHTML = "";
  }

  render(response: APIData<Movie[]>) {
    if (response.status === "loading") {
      this.#parentElement.innerHTML = /*html*/ `${Skeleton.MovieList}`;
      return;
    }

    if (!response.data) return;

    const fragment = document.createDocumentFragment();

    response.data.forEach((movie) => {
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
