import { TMDBMovieListResponse } from "../../api/types";
import { fetchPopularMovies, fetchSearchMovies } from "../../api/movies";
import { toMovieItem } from "../../utils/transform";

export interface MovieItem {
  title: string;
  posterSrc: string;
  rating: number;
}

export interface MoviePageEvent {
  isPending: boolean;
  movies: MovieItem[];
  page: number;
}

type Subscriber = (event: MoviePageEvent) => void;

export class MovieList {
  private isPending: boolean = false;
  private subscribers: Set<Subscriber> = new Set();
  private currentPage: number = 1;
  private totalPages: number = 500;
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
    this.setIsPending(true);

    const response = query
      ? await fetchSearchMovies(query, 1)
      : await fetchPopularMovies(1);

    this.isPending = false;
    this.setMovies(response);
  }

  async loadMore(): Promise<void> {
    if (this.isLastPage()) return;

    this.setIsPending(true);

    const nextPage = this.currentPage + 1;
    const response = this.currentQuery
      ? await fetchSearchMovies(this.currentQuery, nextPage)
      : await fetchPopularMovies(nextPage);

    this.isPending = false;
    this.setMovies(response);
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
      subscriber({ movies, isPending: this.isPending, page: this.currentPage }),
    );
  }
}
