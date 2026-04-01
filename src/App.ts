import template from "../templates/index.html?raw";
import {
  renderMovies,
  renderBanner,
  renderSearchedMovies,
} from "./movieRenderer.ts";

class App {
  #moviePageCount = 1;
  #searchPageCount = 1;
  #isSearched = false;

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    renderBanner();
    renderMovies(this.#moviePageCount);
    this.addEventListeners();
  }

  addEventListeners() {
    // 검색 처음할 때
    document.querySelector(".search-button")!.addEventListener("click", () => {
      this.#isSearched = true;
      this.#searchPageCount = 1;
      const searchKeyword = (document.querySelector(
        ".search-input",
      ) as HTMLInputElement)!.value;
      const list = document.querySelector(".thumbnail-list");
      if (list) {
        list.replaceChildren();
      }
      renderSearchedMovies(searchKeyword, this.#searchPageCount);
    });

    document
      .querySelector<HTMLInputElement>(".search-input")!
      .addEventListener("keydown", (e: KeyboardEvent) => {
        if (e.key === "Enter") {
          this.#isSearched = true;
          this.#searchPageCount = 1;
          const searchKeyword = (document.querySelector(
            ".search-input",
          ) as HTMLInputElement)!.value;
          const list = document.querySelector(".thumbnail-list");
          if (list) {
            list.replaceChildren();
          }
          renderSearchedMovies(searchKeyword, this.#searchPageCount);
        }
      });

    // 더보기 흐름 이벤트 핸들러
    document
      .querySelector("#load-movie-button")!
      .addEventListener("click", () => {
        this.#handleSearch();
      });
  }

  #handleSearch = () => {
    if (!this.#isSearched) {
      this.#moviePageCount += 1;
      renderMovies(this.#moviePageCount);
    }
    if (this.#isSearched) {
      this.#searchPageCount += 1;
      const searchKeyword = (document.querySelector(
        ".search-input",
      ) as HTMLInputElement)!.value;
      renderSearchedMovies(searchKeyword, this.#searchPageCount);
    }
  };
}

new App();
