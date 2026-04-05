import template from "../templates/index.html?raw";
import { renderMovies, renderBanner, renderSearchedMovies } from "./movieRenderer.ts";
import DOM from "./dom.ts";
import { setupEventListeners } from "./eventListeners.ts";
import PopularMovies from "./PopularMovies.ts";
import SearchedMovies from "./SearchedMovies.ts";

type AppMode = "popular" | "search" | "loading";

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
    this.#mode = "loading";
    try {
      await this.#popular.fetch();
      renderBanner(this.#popular.movies[0]);
      renderMovies(this.#popular.movies);
      if (this.#popular.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    } finally {
      this.#mode = "popular";
    }
  };

  #handleSearchSubmit = async () => {
    if (!DOM.searchInput || this.#mode === "loading") return;

    this.#mode = "loading";
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
    } finally {
      this.#mode = "search";
    }
  };

  #handleLoadMore = () => {
    if (this.#mode === "loading") return;
    if (this.#mode === "popular") this.#loadMorePopular();
    else if (this.#mode === "search") this.#loadMoreSearched();
  };

  #loadMorePopular = async () => {
    this.#mode = "loading";
    try {
      await this.#popular.loadMore();
      renderMovies(this.#popular.movies);
      if (this.#popular.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    } finally {
      this.#mode = "popular";
    }
  };

  #loadMoreSearched = async () => {
    if (!DOM.searchInput) return;
    this.#mode = "loading";
    try {
      await this.#searched.loadMore(DOM.searchInput.value);
      renderSearchedMovies(this.#searched.movies);
      if (this.#searched.isLastPage) this.#hideLoadButton();
    } catch (error) {
      alert(error instanceof Error ? error.message : "오류가 발생했습니다.");
    } finally {
      this.#mode = "search";
    }
  };

  #hideLoadButton() {
    if (DOM.loadMovieButton) DOM.loadMovieButton.style.display = "none";
  }
}

new App();
