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

  handleLoadMoreScroll = async () => {
    if (!this.state.isSearched) {
      this.state.moviePageCount += 1;
      const totalPopularPages = await renderMovies(this.state.moviePageCount);
      if (totalPopularPages === this.state.moviePageCount) {
        return true;
      }
    } else {
      this.state.searchPageCount += 1;
      const totalSearchPages = await renderSearchedMovies(
        this.state.currentKeyword,
        this.state.searchPageCount,
      );
      if (totalSearchPages === this.state.searchPageCount) {
        return true;
      }
    }
    return false;
  };

  handleSearchSubmit = async () => {
    this.state.isSearched = true;
    this.state.searchPageCount = 1;
    this.state.currentKeyword =
      document.querySelector<HTMLInputElement>(".search-input")!.value;

    const list = document.querySelector(".thumbnail-list");
    if (list) list.replaceChildren();

    const header = document.querySelector<HTMLElement>("#header");
    if (header) {
      header.replaceChildren();
      replaceBanner(header, this.state.currentKeyword);
    }

    await renderSearchedMovies(
      this.state.currentKeyword,
      this.state.searchPageCount,
    );

    const sectionTitle = document.querySelector("#section-title");
    if (sectionTitle) {
      sectionTitle.textContent = `"${this.state.currentKeyword}" 검색 결과`;
    }
  };
}

export default SearchHandler;
