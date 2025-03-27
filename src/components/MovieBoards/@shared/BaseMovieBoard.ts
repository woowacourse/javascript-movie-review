import { Movie } from "../../../types/movie";
import { isHTMLElement } from "../../../utils/typeGuards";
import MovieList from "./MovieList";

export interface MovieBoardConfig {
  parentElement: HTMLElement;
  initialRender: () => void;
  fetchMovies: (
    page: number
  ) => Promise<{ movies: Movie[]; total_pages: number }>;
  renderMovieList: (movies: Movie[]) => string;
}

abstract class BaseMovieBoard {
  protected readonly parentElement: HTMLElement;
  protected currentPage: number = 1;
  protected totalPages: number = 0;
  protected isLoading: boolean = false;
  protected observer: IntersectionObserver | null = null;

  constructor(protected readonly config: MovieBoardConfig) {
    this.parentElement = config.parentElement;
    this.config.initialRender();
    this.fetchAndRenderMovies();
    this.initInfiniteScroll();
  }

  protected async fetchAndRenderMovies(): Promise<void> {
    if (this.isLoading) return;
    this.isLoading = true;
    try {
      const { movies, total_pages } = await this.config.fetchMovies(
        this.currentPage
      );
      this.totalPages = total_pages;
      if (movies.length === 0 && this.currentPage === 1) {
        this.renderNoResult();
        this.disableInfiniteScroll();
        return;
      }
      this.renderMovies(movies);
      this.currentPage++;
    } catch (error) {
      console.error("영화 데이터를 불러오는 중 오류 발생:", error);
      this.disableInfiniteScroll();
    } finally {
      this.isLoading = false;
    }
  }

  protected renderMovies(movies: Movie[]): void {
    const movieListContainer =
      this.parentElement.querySelector(".thumbnail-list");
    if (!movieListContainer) return;
    if (this.currentPage === 1) {
      movieListContainer.innerHTML = this.config.renderMovieList(movies);
    } else {
      movieListContainer.insertAdjacentHTML(
        "beforeend",
        this.config.renderMovieList(movies)
      );
    }
  }

  private renderNoResult(): void {
    const container = this.config.parentElement.querySelector(
      ".movie-list-container"
    );
    if (!container) return;
    const ul = container.querySelector("ul.thumbnail-list");
    if (!isHTMLElement(ul)) return;
    ul.innerHTML = "";

    const h2 = container.querySelector("h2");
    if (!isHTMLElement(h2)) return;
    h2.insertAdjacentHTML("afterend", new MovieList([]).fallback);
  }

  protected initInfiniteScroll(): void {
    const sentinel = document.createElement("div");
    sentinel.className = "scroll-sentinel";
    this.parentElement.appendChild(sentinel);

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (
          entry.isIntersecting &&
          !this.isLoading &&
          this.currentPage <= this.totalPages
        ) {
          this.fetchAndRenderMovies();
        }
      });
    });
    this.observer.observe(sentinel);
  }

  protected disableInfiniteScroll(): void {
    if (!this.observer) return;
    this.observer.disconnect();
    this.observer = null;
  }
}
export default BaseMovieBoard;
