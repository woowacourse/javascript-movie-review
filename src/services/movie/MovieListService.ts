import { TMDBMovieListResponse } from "../../api/types";
import { fetchPopularMovies, fetchSearchMovies } from "../../api/movies";
import { TMDB_MAX_PAGE } from "../../api/constants";
import { toMovieItem } from "../../utils/transform";
import { AsyncService, AsyncState } from "../AsyncService";

export interface MovieItem {
  id: number;
  title: string;
  posterSrc: string | null;
  rating: number;
}

export interface MoviePageData {
  movies: MovieItem[];
  page: number;
}

export type MoviePageState = AsyncState<MoviePageData>;

export class MovieListService extends AsyncService<MoviePageData> {
  private currentPage: number = 1;
  private totalPages: number = TMDB_MAX_PAGE;
  private currentQuery: string | null = null;

  isLastPage(): boolean {
    return this.currentPage >= this.totalPages;
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
    this.setIsPending(true, { movies: [], page: this.currentPage });

    try {
      const response = this.currentQuery
        ? await fetchSearchMovies(this.currentQuery, page)
        : await fetchPopularMovies(page);
      this.isPending = false;
      this.setMovies(response);
    } catch {
      this.isPending = false;
      this.error = true;
      this.notify({ movies: [], page: this.currentPage });
    }
  }

  private setMovies(response: TMDBMovieListResponse): void {
    this.currentPage = response.page;
    this.totalPages = response.total_pages;
    this.notify({
      movies: response.results.map(toMovieItem),
      page: this.currentPage,
    });
  }
}
