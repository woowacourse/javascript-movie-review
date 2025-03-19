import { MovieItem, MovieResponse } from '../types/Movie.types';
import { ENV } from './env';
import Fetcher from './Fetcher';

export const QUERY_PARAMS = {
  MOVIE: 'movie/popular',
  SEARCH: 'search/movie',
} as const;

class MovieFetcher {
  private movieFetcher: Fetcher;
  private isLoading: boolean = false;
  private currentPage: number = 1;
  private movieResponse: MovieResponse = {} as MovieResponse;
  private movieResult: MovieItem[] = [];

  private MOVIE_API_END_POINT = {
    POPULAR: QUERY_PARAMS.MOVIE,
    SEARCH: QUERY_PARAMS.SEARCH,
  };

  constructor() {
    this.movieFetcher = new Fetcher(ENV.VITE_API_URL);
  }

  private async getMovieData(url: string): Promise<MovieResponse | undefined> {
    this.isLoading = true;
    const response = await this.movieFetcher.get<MovieResponse>(url);
    this.movieResponse = response;
    this.movieResult = [...this.movieResult, ...response.results];

    return response;
  }

  public async getPopularMovies(
    page: number,
  ): Promise<MovieResponse | undefined> {
    this.currentPage = page;
    const url = `${this.MOVIE_API_END_POINT.POPULAR}?page=${page}`;
    return await this.getMovieData(url);
  }

  public async getNextPagePopularMovies(): Promise<MovieResponse | undefined> {
    return await this.getPopularMovies(this.currentPage + 1);
  }

  public async getSearchMovies(
    page: number,
    query: string,
  ): Promise<MovieResponse | undefined> {
    if (page === 1) this.movieResult = [];

    this.currentPage = page;
    const url = `${this.MOVIE_API_END_POINT.SEARCH}?query=${query}&page=${page}`;
    return await this.getMovieData(url);
  }

  public getLoadingState(): boolean {
    return this.isLoading;
  }

  public getCurrentMovieList(): MovieResponse {
    return this.movieResponse;
  }

  public getMovieResult(): MovieItem[] {
    return this.movieResult;
  }
}

export const movieFetcher = new MovieFetcher();
