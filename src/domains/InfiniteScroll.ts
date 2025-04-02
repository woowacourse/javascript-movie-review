import Pagination from "./entities/Pagination";
import MovieService from "./MovieService";

export default class InfiniteScroll {
  private pagination = Pagination.getInstance();
  private isLoading = false;
  private hasReachedEnd = false;
  private lastScrollY = 0;
  private scrollTimeout: number | null = null;

  initialize() {
    this.cleanup();

    this.isLoading = false;
    this.hasReachedEnd = false;
    this.lastScrollY = window.scrollY;

    window.addEventListener("scroll", this.handleScroll.bind(this), {
      passive: true,
    });
  }

  private handleScroll() {
    if (this.isLoading || this.hasReachedEnd) return;

    const currentScrollY = window.scrollY;
    const isScrollingDown = currentScrollY > this.lastScrollY;
    this.lastScrollY = currentScrollY;

    if (!isScrollingDown) return;

    if (this.scrollTimeout === null) {
      this.scrollTimeout = window.setTimeout(() => {
        this.checkAndLoadMoreItems();
        this.scrollTimeout = null;
      }, 400);
    }
  }

  private checkAndLoadMoreItems() {
    const viewportHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const documentHeight = document.documentElement.scrollHeight;
    const scrolledToBottom = viewportHeight + scrollY >= documentHeight - 150;

    if (scrolledToBottom) this.loadMoreItems();
  }

  private async loadMoreItems() {
    if (
      this.hasReachedEnd ||
      this.isLoading ||
      this.pagination.hasReachedEnd()
    ) {
      this.hasReachedEnd = true;
      return;
    }

    this.isLoading = true;
    this.pagination.nextPage();
    await MovieService.getInstance().renderMovies();
    this.isLoading = false;
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  setHasReachedEnd(value: boolean) {
    this.hasReachedEnd = value;
  }

  cleanup() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));
    if (this.scrollTimeout !== null) clearTimeout(this.scrollTimeout);
  }
}
