import template from "../templates/index.html?raw";
import {
  renderMovies,
  renderBanner,
  renderSearchedMovies,
} from "./movieRenderer.ts";

class App {
  #moviePageCount = 1;
  #searchPageCount = 0;

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    renderBanner();
    renderMovies(this.#moviePageCount);
    this.addEventListeners();
  }

  addEventListeners() {
    document
      .querySelector("#load-movie-button")!
      .addEventListener("click", () => {
        this.#moviePageCount += 1;
        renderMovies(this.#moviePageCount);
      });
    document.querySelector(".search-button")!.addEventListener("click", () => {
      this.#searchPageCount += 1;
      const searchKeyword = document.querySelector(".search-input").value;
      renderSearchedMovies(searchKeyword, this.#searchPageCount);
    });
  }
}

new App();
