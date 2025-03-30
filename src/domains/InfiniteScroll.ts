import { MAX_MOVIE_PAGE } from "../constants/constants";
import { store } from "../stores";
import MovieRenderer from "./MovieRenderer";

export default class InfiniteScroll {
  private static instance: InfiniteScroll;
  private isLoading = false;
  private hasReachedEnd = false;

  static getInstance(): InfiniteScroll {
    if (!InfiniteScroll.instance)
      InfiniteScroll.instance = new InfiniteScroll();
    return InfiniteScroll.instance;
  }

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
      store.page >= Math.min(MAX_MOVIE_PAGE, store.totalPages)
    ) {
      this.hasReachedEnd = true;
      return;
    }

    this.isLoading = true;

    store.page = store.page + 1;

    await MovieRenderer.getInstance().renderMovies();

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
