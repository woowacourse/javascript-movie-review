import movieService from "../service/movieService.ts";
import { selectElement } from "../utils/ui.ts";
import Modal from "./Modal.ts";
import MovieItemDetails from "./movieDetails/MovieItemDetails.ts";

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

  onMovieClick(modal: Modal) {
    const handleMovieClick = async (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest("ul.thumbnail-list > li")) {
        return;
      }

      const movieContainer = target.closest(
        "ul.thumbnail-list > li"
      ) as HTMLLIElement;
      const id = Number(movieContainer.dataset.id);

      const details = await movieService.getMovieDetail(id);
      const modalDetails = new MovieItemDetails(details).create();
      modal.open(modalDetails);
    };

    this.#container.addEventListener("click", handleMovieClick);
  }
}

export default MovieList;
