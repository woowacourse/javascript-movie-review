import { renderMovies } from "./movieRenderer.ts";
import {
  renderSearchedMovies,
  resetMovieList,
  replaceHeaderWithBanner,
  replaceSectionTitle,
} from "./searchPageRenderer.ts";
import AppState from "./AppState.ts";
import { createScrollObserver } from "./utils/scrollObserver.ts";

class MovieBrowseHandler {
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

  async init() {
    await renderMovies(this.state.moviePageCount);

    document.addEventListener("click", this.handleSearchButtonClick);
    document.addEventListener("keydown", this.handleSearchKeydown);

    const sentinel = document.querySelector<HTMLElement>("#scroll-sentinel");
    if (sentinel) {
      let cleanup: () => void;
      cleanup = createScrollObserver(sentinel, async () => {
        const isLastPage = await this.handleLoadMoreScroll();
        if (isLastPage) cleanup();
      });
    }
  }

  handleLoadMoreScroll = async () => {
    if (this.state.isLoading) return false;
    this.state.isLoading = true;

    try {
      if (!this.state.isSearched) {
        const nextPage = this.state.moviePageCount + 1;
        const totalPages = await renderMovies(nextPage);

        if (totalPages > 0) this.state.moviePageCount = nextPage;
        if (totalPages === nextPage) return true;
      } else {
        const nextPage = this.state.searchPageCount + 1;
        const totalSearchPages = await renderSearchedMovies(
          this.state.currentKeyword,
          nextPage,
        );

        if (totalSearchPages > 0) this.state.searchPageCount = nextPage;
        if (nextPage === totalSearchPages) return true;
      }
    } finally {
      this.state.isLoading = false;
    }

    return false;
  };

  handleSearchSubmit = async () => {
    this.state.isLoading = true;
    this.state.isSearched = true;
    this.state.searchPageCount = 1;
    this.state.currentKeyword =
      document.querySelector<HTMLInputElement>(".search-input")!.value;

    resetMovieList();
    replaceHeaderWithBanner(this.state.currentKeyword);
    replaceSectionTitle(this.state.currentKeyword);

    try {
      await renderSearchedMovies(
        this.state.currentKeyword,
        this.state.searchPageCount,
      );
    } finally {
      this.state.isLoading = false;
    }
  };
}

export default MovieBrowseHandler;
