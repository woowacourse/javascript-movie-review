import { MOVIE_IMAGE_URL, POPULAR_MOVIE_URL, SEARCH_MOVIE_URL } from '../constants/movieURLs';
import { FetchedMovieJson } from '../types/fetchedMovie';
import { MovieItem } from '../types/movie';
import { Params } from '../types/params';
import fetchJson from './fetchJson';

class MovieFetcher {
  private base = POPULAR_MOVIE_URL;

  private params: Params;

  constructor() {
    this.params = {
      api_key: process.env.API_KEY as string,
      language: 'ko-KR',
      page: '0',
    };
  }

  private totalPages!: number;

  fetchMovies() {
    this.params.page = String(Number(this.params.page) + 1);

    return fetchJson(this.createSearchURL(this.params), this.processMovieData.bind(this));
  }

  fetchSearchMovies(keyword: string) {
    return this.setSearchSettings(keyword).fetchMovies();
  }

  fetchPopularMovies() {
    return this.setPopularSettings().fetchMovies();
  }

  setSearchSettings(keyword: string) {
    console.log(keyword, 'argu: keyword');
    this.base = SEARCH_MOVIE_URL;
    this.params = {
      ...this.params,
      query: keyword,
      page: '0',
    };

    return this;
  }

  setPopularSettings() {
    this.base = POPULAR_MOVIE_URL;
    this.params = {
      ...this.params,
      page: '0',
    };

    return this;
  }

  createSearchURL(params: Params) {
    // ?api_key=${process.env.API_KEY}&language=ko-KR
    const url = new URL(this.base);
    Object.entries(params).forEach(([param, value]) => {
      console.log(param, value);
      url.searchParams.append(param, value);
    });

    console.log(url.toString());

    return url.toString();
  }

  processMovieData({ page, results, total_pages }: FetchedMovieJson) {
    const movies: MovieItem[] = results.map(result => ({
      title: result.title,
      posterPath: `${MOVIE_IMAGE_URL}${result.poster_path}`,
      voteAverage: result.vote_average,
    }));

    this.params.page = String(page);
    this.totalPages = total_pages;

    return movies;
  }

  isLastPage() {
    return Number(this.params.page) === this.totalPages;
  }
}

export default MovieFetcher;
