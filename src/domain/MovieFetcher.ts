import { MovieItem, MovieResponse } from '../types/Movie.types';
import { ENV } from '../api/env';
import Fetcher from '../api/Fetcher';
import { movieFetcherEvent } from './MovieFetcherEvent';
import { delay } from '../utils/delay';
import { MovieDetailResponse } from '../types/MovieDetail.types';

export const API_PATH = {
  MOVIE: 'movie/popular',
  SEARCH: 'search/movie',
  DETAIL: '/movie/',
} as const;

type MovieFetcherState = {
  isLoading: boolean;
  isSearch: boolean;
  movieResponse: MovieResponse;
  movieResult: MovieItem[];
};

class MovieFetcher {
  private movieFetcher: Fetcher;
  private state: MovieFetcherState;
  private query: string = '';
  private currentPage: number = 1;
  private error: Error | null = null;

  constructor() {
    this.movieFetcher = new Fetcher(ENV.VITE_API_URL);
    const initialState: MovieFetcherState = {
      isLoading: false,
      isSearch: false,
      movieResponse: {
        page: 0,
        results: [],
        total_pages: 0,
        total_results: 0,
      },
      movieResult: [],
    };

    this.state = this.createStateProxy(initialState);
  }

  private createStateProxy(initialState: MovieFetcherState): MovieFetcherState {
    return new Proxy(initialState, {
      set: <K extends keyof MovieFetcherState>(
        obj: MovieFetcherState,
        prop: K,
        value: MovieFetcherState[K],
      ): boolean => {
        const oldValue = obj[prop];
        obj[prop] = value;

        if (oldValue !== value) {
          movieFetcherEvent.notify();
        }

        return true;
      },
    });
  }

  private async fetchMovieData(
    url: string,
  ): Promise<MovieResponse | undefined> {
    this.state.isLoading = true;
    this.error = null;

    const response = await this.movieFetcher.get<MovieResponse>(url);

    this.state.isLoading = false;
    this.updateMovieData(response);

    return response;
  }

  private updateMovieData(response: MovieResponse): void {
    this.state.movieResponse = response;
    this.state.movieResult = [...this.state.movieResult, ...response.results];
  }

  public async getPopularMovies(
    page: number,
  ): Promise<MovieResponse | undefined> {
    this.currentPage = page;
    const url = `${API_PATH.MOVIE}?page=${page}`;
    const res = await this.fetchMovieData(url);

    await delay(1000);
    return res;
  }

  public async getNextPagePopularMovies() {
    await this.getPopularMovies(this.currentPage + 1);
  }

  public async getSearchMovies(
    page: number,
    query: string,
  ): Promise<MovieResponse | undefined> {
    this.state.isLoading = true;
    this.state.isSearch = true;

    if (page === 1) {
      this.state.movieResult = [];
    }

    this.currentPage = page;
    this.query = query;

    const url = `${API_PATH.SEARCH}?query=${query}&page=${page}`;
    return await this.fetchMovieData(url);
  }

  public async getMovieDetail(
    id: number,
  ): Promise<MovieDetailResponse | undefined> {
    const url = `${API_PATH.DETAIL}/${id}`;
    const res = await this.movieFetcher.get<MovieDetailResponse>(url);
    return res;
  }

  public async getNextPageSearchMovies() {
    await this.getSearchMovies(this.currentPage + 1, this.query);
  }

  get movies(): MovieItem[] {
    return this.state.movieResult ?? [];
  }

  get isLoadingState(): boolean {
    return this.state.isLoading;
  }

  get isSearchState(): boolean {
    return this.state.isSearch;
  }

  get currentMovieResponse(): MovieResponse {
    return this.state.movieResponse;
  }

  get queryText(): string {
    return this.query;
  }

  get errorState(): Error | null {
    return this.error;
  }
}

export const movieFetcher = new MovieFetcher();
