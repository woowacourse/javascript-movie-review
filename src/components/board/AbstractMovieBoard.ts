import ScrollManager from "../../events/ScrollManager";
import { Movie } from "../../types/movie";
import { isHTMLElement } from "../../utils/typeGuards";
import MovieList from "../MovieList";

abstract class AbstractMovieBoard {
  protected parentElement: HTMLElement;
  protected page = 1;
  protected isLoading = false;
  protected ScrollManager!: ScrollManager;
  protected MovieList!: MovieList;

  constructor(parentElement: HTMLElement) {
    this.parentElement = parentElement;
    this.scrollToTop();
  }

  protected scrollToTop() {
    window.scrollTo(0, 0);
  }

  protected abstract renderInitialLayout(): void;
  protected abstract movieData(): Promise<{
    movies: Movie[];
    total_pages: number;
  }>;

  protected initComponents(): void {
    const $thumbnailList = this.parentElement.querySelector(".thumbnail-list");
    if (isHTMLElement($thumbnailList)) {
      this.MovieList = new MovieList($thumbnailList);
    }
  }

  protected abstract fetchAndRenderMovies(): Promise<void>;

  protected showLoading(): void {
    this.MovieList.render({ status: "loading" });
  }

  protected renderMovies(movies: Movie[]): void {
    if (this.page === 1) {
      this.MovieList.init();
      this.MovieList.render({ status: "success", data: movies });
      return;
    }

    this.MovieList.render({ status: "success", data: movies });
  }

  protected async loadMoreMovies(): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;
    this.page += 1;

    const { movies: newMovies, total_pages } = await this.movieData();
    this.renderMovies(newMovies);
    this.isLoading = false;

    if (this.shouldStopPagination(total_pages)) {
      this.destroy();
    }
  }

  protected addEventListeners(): void {
    const $sentinel = this.parentElement.querySelector(".scroll-sentinel");
    if (!isHTMLElement($sentinel)) return;

    this.ScrollManager = new ScrollManager({
      target: $sentinel,
      threshold: 150,
      callback: () => this.loadMoreMovies(),
    });
    this.ScrollManager.start();
  }

  protected abstract shouldStopPagination(total_pages?: number): boolean;

  protected renderNoResult?(): void;

  public destroy(): void {
    this.ScrollManager?.stop?.();
  }
}

export default AbstractMovieBoard;
