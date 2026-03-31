import template from "../templates/index.html?raw";
import { renderMovies, renderBanner } from "./movieRenderer.ts";

class App {
  #moviePageCount = 1;

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
  }
}

new App();
