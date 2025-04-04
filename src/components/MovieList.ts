import { APIData } from "../types/apiData";
import { Movie } from "../types/movie";
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
