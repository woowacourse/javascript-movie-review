import { MOVIE_IMAGE_URL, POPULAR_MOVIE_URL, SEARCH_MOVIE_URL } from '../constants/movieURLs';
import { FetchedMovieJson } from '../types/fetchedMovie';
import { MovieItem } from '../types/movie';
import fetchJson from './fetchJson';

class MovieFetcher {
  private base = POPULAR_MOVIE_URL;

  private params: { [param: string]: string };

  constructor() {
    this.params = {
      api_key: process.env.API_KEY as string,
      language: 'ko-KR',
      page: '0',
    };
  }

  private totalPages!: number;

  fetchMovies(): Promise<any> {
    this.params.page = String(Number(this.params.page) + 1);

    return fetchJson(this.createSearchURL(this.params), this.processMovieData.bind(this));
  }

  fetchSearchMovies(keyword: string): Promise<any> {
    return this.setSearchSettings(keyword).fetchMovies();
  }

  fetchPopularMovies(): Promise<any> {
    return this.setPopularSettings().fetchMovies();
  }

  setSearchSettings(keyword: string): this {
    this.base = SEARCH_MOVIE_URL;
    this.params = {
      ...this.params,
      query: keyword,
      page: '0',
    };

    return this;
  }

  setPopularSettings(): this {
    this.base = POPULAR_MOVIE_URL;
    this.params = {
      ...this.params,
      page: '0',
    };

    return this;
  }

  createSearchURL(params: { [param: string]: string }): string {
    const url = new URL(this.base);
    Object.entries(params).forEach(([param, value]) => {
      url.searchParams.append(param, value);
    });

    return url.toString();
  }

  processMovieData({ page, results, total_pages }: FetchedMovieJson): MovieItem[] {
    const movies: MovieItem[] = results.map(result => ({
      title: result.title,
      posterPath: `${MOVIE_IMAGE_URL}/${result.poster_path}`,
      voteAverage: result.vote_average,
    }));

    this.params.page = String(page);
    this.totalPages = total_pages;

    return movies;
  }

  isLastPage(): boolean {
    return Number(this.params.page) === this.totalPages;
  }
}

export default MovieFetcher;
