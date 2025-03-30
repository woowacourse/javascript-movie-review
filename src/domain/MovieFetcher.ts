import { MovieDetail, MovieItem, MovieResponse } from '../types/Movie.types';
import { ENV } from '../api/env';
import Fetcher from '../api/Fetcher';
import { movieFetcherEvent } from './MovieFetcherEvent';
import { delay } from '../utils/delay';

export const API_PATHS = {
  MOVIE: 'movie/popular',
  SEARCH: 'search/movie',
  DETAIL: 'movie',
} as const;

class MovieFetcher {
  private movieFetcher: Fetcher;
  private isLoading: boolean = false;
  private isSearch: boolean = false;
  private query: string = '';
  private currentPage: number = 1;
  private movieResponse: MovieResponse = {
    page: 1,
    results: [],
    total_pages: 0,
    total_results: 0,
  };
  private movieResult: MovieItem[] = [];

  private error: Error | null = null;

  constructor() {
    this.movieFetcher = new Fetcher(ENV.VITE_API_URL);
  }

  private async fetchMovieData(
    url: string,
  ): Promise<MovieResponse | undefined> {
    this.isLoading = true;
    this.error = null;
    movieFetcherEvent.notify();

    try {
      const response = await this.movieFetcher.get<MovieResponse>(url);
      // await delay(3000);

      this.updateMovieData(response);

      this.isLoading = false;
      movieFetcherEvent.notify();

      return response;
    } catch (error) {
      this.isLoading = false;
      this.error = error as Error;
      movieFetcherEvent.notify();
    }
  }

  private updateMovieData(response: MovieResponse): void {
    this.movieResponse = response;
    this.movieResult = [...this.movieResult, ...response.results];
  }

  public async getPopularMovies(
    page: number,
  ): Promise<MovieResponse | undefined> {
    this.isSearch = false;
    this.currentPage = page;
    const url = `${API_PATHS.MOVIE}?page=${page}`;
    return await this.fetchMovieData(url);
  }

  public async getNextPagePopularMovies() {
    await this.getPopularMovies(this.currentPage + 1);
  }

  public async getSearchMovies(
    page: number,
    query: string,
  ): Promise<MovieResponse | undefined> {
    this.movieResult = [];
    this.isSearch = true;
    this.currentPage = page;
    this.query = query;

    const url = `${API_PATHS.SEARCH}?query=${query}&page=${page}`;
    return await this.fetchMovieData(url);
  }

  public async getNextPageSearchMovies() {
    await this.getSearchMovies(this.currentPage + 1, this.query);
  }

  public async getMovieDetail(movieId: number): Promise<MovieDetail> {
    try {
      const url = `${API_PATHS.DETAIL}/${movieId}?language=ko-KR`;
      return await this.movieFetcher.get<MovieDetail>(url);
    } catch (error) {
      throw error;
    }
  }

  get movies(): MovieItem[] {
    return this.movieResult ?? [];
  }

  get isLoadingState(): boolean {
    return this.isLoading;
  }

  get isSearchState(): boolean {
    return this.isSearch;
  }

  get currentMovieResponse(): MovieResponse {
    return this.movieResponse;
  }

  get queryText(): string {
    return this.query;
  }

  get errorState(): Error | null {
    return this.error;
  }
}

export const movieFetcher = new MovieFetcher();
