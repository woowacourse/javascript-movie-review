import { TMDBMovieListResponse } from "../../api/types";
import { fetchPopularMovies, fetchSearchMovies } from "../../api/movies";
import { TMDB_MAX_PAGE } from "../../api/constants";
import { toMovieItem } from "../../utils/transform";

export interface MovieItem {
  id: number;
  title: string;
  posterSrc: string;
  rating: number;
}

export interface MoviePageEvent {
  isPending: boolean;
  movies: MovieItem[];
  page: number;
  error: boolean;
}

type Subscriber = (event: MoviePageEvent) => void;

export class MovieList {
  private isPending: boolean = false;
  private error: boolean = false;
  private subscribers: Set<Subscriber> = new Set();
  private currentPage: number = 1;
  private totalPages: number = TMDB_MAX_PAGE;
  private currentQuery: string | null = null;

  isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
  }

  subscribe(subscriber: Subscriber): void {
    this.subscribers.add(subscriber);
  }

  unsubscribe(subscriber: Subscriber): void {
    this.subscribers.delete(subscriber);
  }

  async load(query?: string): Promise<void> {
    this.currentPage = 1;
    this.currentQuery = query ?? null;
    await this.fetchMoviePage(1);
  }

  async loadMore(): Promise<void> {
    if (this.isLastPage() || this.isPending) return;
    await this.fetchMoviePage(this.currentPage + 1);
  }

  private async fetchMoviePage(page: number): Promise<void> {
    this.error = false;
    this.setIsPending(true);

    try {
      const response = this.currentQuery
        ? await fetchSearchMovies(this.currentQuery, page)
        : await fetchPopularMovies(page);
      this.isPending = false;
      this.setMovies(response);
    } catch {
      this.isPending = false;
      this.error = true;
      this.notify([]);
    }
  }

  private setMovies(response: TMDBMovieListResponse): void {
    this.currentPage = response.page;
    this.totalPages = response.total_pages;
    this.notify(response.results.map(toMovieItem));
  }

  private setIsPending(value: boolean): void {
    this.isPending = value;
    this.notify([]);
  }

  private notify(movies: MovieItem[]): void {
    this.subscribers.forEach((subscriber) =>
      subscriber({
        movies,
        isPending: this.isPending,
        page: this.currentPage,
        error: this.error,
      }),
    );
  }
}
