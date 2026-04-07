import {
  renderMovies,
  renderSearchedMovies,
  replaceBanner,
} from "./movieRenderer.ts";
import AppState from "./AppState.ts";

class SearchHandler {
  constructor(private state: AppState) {}

  handleSearchButtonClick = (e: MouseEvent) => {
    if ((e.target as HTMLElement).closest(".search-button")) {
      this.handleSearchSubmit();
    }
  };

  handleSearchKeydown = (e: KeyboardEvent) => {
    if (
      e.key === "Enter" &&
      (e.target as HTMLElement).closest(".search-input")
    ) {
      this.handleSearchSubmit();
    }
  };

  handleLoadMoreClick = async () => {
    if (!this.state.isSearched) {
      this.state.moviePageCount += 1;
      const totalPopularPages = await renderMovies(this.state.moviePageCount);
      if (totalPopularPages === this.state.moviePageCount) {
        this.hideLoadButton();
      }
    } else {
      this.state.searchPageCount += 1;
      const totalSearchPages = await renderSearchedMovies(
        this.state.currentKeyword,
        this.state.searchPageCount,
      );
      if (totalSearchPages === this.state.searchPageCount) {
        this.hideLoadButton();
      }
    }
  };

  handleSearchSubmit = async () => {
    this.state.isSearched = true;
    this.state.searchPageCount = 1;
    this.state.totalSearchPages = 0;
    this.showLoadButton();
    this.state.currentKeyword =
      document.querySelector<HTMLInputElement>(".search-input")!.value;

    const list = document.querySelector(".thumbnail-list");
    if (list) list.replaceChildren();

    const header = document.querySelector<HTMLElement>("#header");
    if (header) {
      header.replaceChildren();
      replaceBanner(header, this.state.currentKeyword);
    }

    this.state.totalSearchPages = await renderSearchedMovies(
      this.state.currentKeyword,
      this.state.searchPageCount,
    );
    if (this.state.totalSearchPages === this.state.searchPageCount) {
      this.hideLoadButton();
    }

    const sectionTitle = document.querySelector("#section-title");
    if (sectionTitle) {
      sectionTitle.textContent = `"${this.state.currentKeyword}" 검색 결과`;
    }
  };

  private hideLoadButton() {
    const loadMovieButton =
      document.querySelector<HTMLElement>("#load-movie-button");
    if (loadMovieButton) loadMovieButton.style.display = "none";
  }

  private showLoadButton() {
    const loadMovieButton =
      document.querySelector<HTMLElement>("#load-movie-button");
    if (loadMovieButton) loadMovieButton.style.display = "";
  }
}

export default SearchHandler;
