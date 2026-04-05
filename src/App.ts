import template from "../templates/index.html?raw";
import {
  renderMovies,
  renderSearchedMovies,
} from "./movieRenderer.ts";
import AppState from "../src/AppState.ts";
import DOM from "./dom.ts";

class App {
  #state = new AppState();

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    renderMovies(this.#state.moviePageCount);
    this.addEventListeners();
  }

  addEventListeners() {
    const loadMovieButton = DOM.loadMovieButton;
    if (!loadMovieButton) return;

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
    loadMovieButton.addEventListener("click", () => {
      this.#handleSearch();
    });
  }

  // 검색 엔터 / 검색 버튼 시 렌더링 함수
  #handleSearchSubmit = async () => {
    if (!DOM.searchInput) return;

    this.#state.isSearched = true;
    this.#state.searchPageCount = 1;

    if (DOM.thumbnailList) DOM.thumbnailList.replaceChildren();
    if (DOM.loadMovieButton) DOM.loadMovieButton.style.display = "";
    if (DOM.backgroundContainer) DOM.backgroundContainer.hidden = true;

    this.#state.totalSearchPages = await renderSearchedMovies(
      DOM.searchInput.value,
      this.#state.searchPageCount,
    );

    if (this.#state.totalSearchPages === this.#state.searchPageCount) {
      this.#hideLoadButton();
    }

    if (DOM.sectionTitle) {
      DOM.sectionTitle.textContent = `"${DOM.searchInput.value}" 검색 결과`;
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
      if (!DOM.searchInput) return;

      this.#state.searchPageCount += 1;
      const totalSearchPages = await renderSearchedMovies(
        DOM.searchInput.value,
        this.#state.searchPageCount,
      );
      if (totalSearchPages === this.#state.searchPageCount) {
        this.#hideLoadButton();
      }
    }
  };

  // 더보기 버튼 숨기는 헬퍼 함수
  #hideLoadButton() {
    if (DOM.loadMovieButton) DOM.loadMovieButton.style.display = "none";
  }
}

new App();
