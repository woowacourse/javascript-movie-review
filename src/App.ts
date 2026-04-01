import template from "../templates/index.html?raw";
import {
  renderMovies,
  renderBanner,
  renderSearchedMovies,
  replaceBanner,
} from "./movieRenderer.ts";

class App {
  #moviePageCount = 1;
  #searchPageCount = 1;
  #isSearched = false;
  #totalPopularPages = 0;
  #totalSearchPages = 0;

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    renderBanner();
    this.#initializeMovies();
    this.addEventListeners();
  }

  async #initializeMovies() {
    const totalPages = await renderMovies(this.#moviePageCount);
    this.#totalPopularPages = totalPages;
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
    this.#isSearched = true;
    this.#searchPageCount = 1;
    const searchKeyword = (document.querySelector(
      ".search-input",
    ) as HTMLInputElement)!.value;

    const list = document.querySelector(".thumbnail-list");
    if (list) list.replaceChildren();

    const header = document.querySelector("#header");
    if (header) {
      header.replaceChildren();
      replaceBanner(header, searchKeyword);
    }

    this.#totalSearchPages = await renderSearchedMovies(
      searchKeyword,
      this.#searchPageCount,
    );
    if (this.#totalSearchPages === this.#searchPageCount) {
      const loadMovieButton = document.querySelector("#load-movie-button");
      (loadMovieButton as HTMLElement).style.display = "none";
    }

    const sectionTitle = document.querySelector("#section-title");
    if (sectionTitle) {
      sectionTitle.textContent = `"${searchKeyword}" 검색 결과`;
    }
  };

  // 초기화면, 검색화면 분기에 따른 더보기 함수
  #handleSearch = async () => {
    if (!this.#isSearched) {
      this.#moviePageCount += 1;
      const totalPopularPages = await renderMovies(this.#moviePageCount);
      if (totalPopularPages === this.#totalPopularPages) {
        const loadMovieButton = document.querySelector(
          "#load-movie-button",
        ) as HTMLElement;
        loadMovieButton.style.display = "none";
      }
    }
    if (this.#isSearched) {
      this.#searchPageCount += 1;
      const searchKeyword = (document.querySelector(
        ".search-input",
      ) as HTMLInputElement)!.value;
      const totalSearchPages = await renderSearchedMovies(
        searchKeyword,
        this.#searchPageCount,
      );
      if (totalSearchPages === this.#searchPageCount) {
        const loadMovieButton = document.querySelector(
          "#load-movie-button",
        ) as HTMLElement;
        loadMovieButton.style.display = "none";
      }
    }
  };
}

new App();
