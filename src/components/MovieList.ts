import { MovieDetails } from "../../types/domain.ts";
import { selectElement } from "../utils/dom.ts";
import Modal from "./Modal.ts";
import MovieItemDetails from "./MovieItemDetails.ts";

class MovieList {
  #movieList: string[];
  #totalItems: number;
  #container: HTMLUListElement;

  constructor(movieList: string[]) {
    this.#movieList = movieList;
    this.#totalItems = this.#movieList.length;
    this.#container = selectElement<HTMLUListElement>("ul.thumbnail-list");
  }

  create() {
    const movieItemsContent = this.#movieList.join("");

    this.#container.insertAdjacentHTML("beforeend", movieItemsContent);
  }

  clearList() {
    this.#container.replaceChildren();
  }

  updateList(newMovieItems: string[]) {
    this.#movieList = [...this.#movieList, ...newMovieItems];
    this.#totalItems = this.#movieList.length;

    this.#container.insertAdjacentHTML("beforeend", newMovieItems.join(""));
  }

  getTotalItems() {
    return this.#totalItems;
  }

  onMovieClick(getDetail: (id: number) => Promise<MovieDetails>, modal: Modal) {
    const handleMovieClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("ul.thumbnail-list")) {
        return;
      }

      const movieContainer = target.closest("li.item") as HTMLLIElement;
      const id = Number(movieContainer.dataset.id);

      const details = await getDetail(id);

      const modalDetails = new MovieItemDetails(details).create();

      modal.clearContents();
      modal.renderContents(modalDetails);
      modal.open();
    };

    this.#container.addEventListener("click", handleMovieClick);
  }
}

export default MovieList;
