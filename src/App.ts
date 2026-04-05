import template from "../templates/index.html?raw";
import { renderMovies, renderBanner, renderSearchedMovies } from "./movieRenderer.ts";
import DOM from "./dom.ts";
import { setupEventListeners } from "./eventListeners.ts";
import PopularMovies from "./PopularMovies.ts";
import SearchedMovies from "./SearchedMovies.ts";

type AppMode = "popular" | "search";

class App {
  #popular = new PopularMovies();
  #searched = new SearchedMovies();
  #mode: AppMode = "popular";

  constructor() {
    document.querySelector("#app")!.innerHTML = template;
    this.#loadPopularMovies();
    setupEventListeners(
      () => this.#handleSearchSubmit(),
      () => this.#handleLoadMore(),
    );
  }

  #loadPopularMovies = async () => {
    try {
      await this.#popular.fetch();
      renderBanner(this.#popular.movies[0]);
      renderMovies(this.#popular.movies);
      if (this.#popular.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    }
  };

  #handleSearchSubmit = async () => {
    if (!DOM.searchInput) return;

    this.#mode = "search";
    this.#searched.reset();

    if (DOM.thumbnailList) DOM.thumbnailList.replaceChildren();
    if (DOM.loadMovieButton) DOM.loadMovieButton.style.display = "";
    if (DOM.backgroundContainer) DOM.backgroundContainer.hidden = true;

    try {
      await this.#searched.fetch(DOM.searchInput.value);
      renderSearchedMovies(this.#searched.movies);
      if (this.#searched.isLastPage) this.#hideLoadButton();
      if (DOM.sectionTitle) {
        DOM.sectionTitle.textContent = `"${DOM.searchInput.value}" 검색 결과`;
      }
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    }
  };

  #handleLoadMore = () => {
    if (this.#mode === "popular") this.#loadMorePopular();
    else if (this.#mode === "search") this.#loadMoreSearched();
  };

  #loadMorePopular = async () => {
    try {
      await this.#popular.loadMore();
      renderMovies(this.#popular.movies);
      if (this.#popular.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    }
  };

  #loadMoreSearched = async () => {
    if (!DOM.searchInput) return;
    try {
      await this.#searched.loadMore(DOM.searchInput.value);
      renderSearchedMovies(this.#searched.movies);
      if (this.#searched.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    }
  };

  #hideLoadButton() {
    if (DOM.loadMovieButton) DOM.loadMovieButton.style.display = "none";
  }
}

new App();
