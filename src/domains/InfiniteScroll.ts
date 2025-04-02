import Pagination from "./entities/Pagination";
import MovieService from "./MovieService";

export default class InfiniteScroll {
  private pagination = Pagination.getInstance();
  private isLoading = false;
  private hasReachedEnd = false;

  initialize() {
    window.removeEventListener("scroll", this.handleScroll.bind(this));

    this.isLoading = false;
    this.hasReachedEnd = false;

    window.addEventListener("scroll", this.handleScroll.bind(this));
  }

  private handleScroll() {
    if (this.isLoading || this.hasReachedEnd) return;

    this.checkAndLoadMoreItems();
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

  getIsLoading() {
    return this.isLoading;
  }

  setIsLoading(value: boolean) {
    this.isLoading = value;
  }

  setHasReachedEnd(value: boolean) {
    this.hasReachedEnd = value;
  }
}
