import template from "../templates/index.html?raw";
import {
  renderMovies,
  renderSearchedMovies,
  replaceBanner,
} from "./movieRenderer.ts";
import AppState from "../src/AppState.ts";

class App {
  #state = new AppState();

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    renderMovies(this.#state.moviePageCount);
    this.addEventListeners();
  }

  addEventListeners() {
    document.addEventListener("click", (e: MouseEvent) => {
      if ((e.target as HTMLElement).closest(".search-button")) {
        this.#handleSearchSubmit();
      }
    });

    document.addEventListener("keydown", (e: KeyboardEvent) => {
      if (
        e.key === "Enter" &&
        (e.target as HTMLElement).closest(".search-input")
      ) {
        this.#handleSearchSubmit();
      }
    });

    // 더보기 흐름 이벤트 핸들러
    document
      .querySelector("#load-movie-button")!
      .addEventListener("click", () => {
        this.#handleSearch();
      });
  }

  // 검색 엔터 / 검색 버튼 시 렌더링 함수
  #handleSearchSubmit = async () => {
    this.#state.isSearched = true;
    this.#state.searchPageCount = 1;
    this.#state.currentKeyword =
      document.querySelector<HTMLInputElement>(".search-input")!.value;

    const list = document.querySelector(".thumbnail-list");
    if (list) list.replaceChildren();

    const loadMovieButton = document.querySelector<HTMLElement>("#load-movie-button");
    if (loadMovieButton) loadMovieButton.style.display = "";

    const header = document.querySelector<HTMLElement>("#header");
    if (header) {
      header.replaceChildren();
      replaceBanner(header, this.#state.currentKeyword);
    }

    this.#state.totalSearchPages = await renderSearchedMovies(
      this.#state.currentKeyword,
      this.#state.searchPageCount,
    );
    if (this.#state.totalSearchPages === this.#state.searchPageCount) {
      this.#hideLoadButton();
    }

    const sectionTitle = document.querySelector("#section-title");
    if (sectionTitle) {
      sectionTitle.textContent = `"${this.#state.currentKeyword}" 검색 결과`;
    }
  };

  // 초기화면, 검색화면 분기에 따른 더보기 함수
  #handleSearch = async () => {
    if (!this.#state.isSearched) {
      this.#state.moviePageCount += 1;
      const totalPopularPages = await renderMovies(this.#state.moviePageCount);
      if (totalPopularPages === this.#state.moviePageCount) {
        this.#hideLoadButton();
      }
    }
    if (this.#state.isSearched) {
      this.#state.searchPageCount += 1;
      const totalSearchPages = await renderSearchedMovies(
        this.#state.currentKeyword,
        this.#state.searchPageCount,
      );
      if (totalSearchPages === this.#state.searchPageCount) {
        this.#hideLoadButton();
      }
    }
  };

  // 더보기 버튼 숨기는 헬퍼 함수
  #hideLoadButton() {
    const loadMovieButton =
      document.querySelector<HTMLElement>("#load-movie-button");
    if (loadMovieButton) loadMovieButton.style.display = "none";
  }
}

new App();
