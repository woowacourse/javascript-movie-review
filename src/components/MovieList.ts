import { selectElement } from "../utils/dom.ts";

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

  updateList(newMovieList: string[]) {
    this.#movieList = [...this.#movieList, ...newMovieList];
    this.#totalItems = this.#movieList.length;

    this.#container.insertAdjacentHTML("beforeend", newMovieList.join(""));
  }

  getTotalItems() {
    return this.#totalItems;
  }
}

export default MovieList;
