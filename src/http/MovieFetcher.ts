import Fetcher from "./Fetcher";

import { HttpFetcher } from "../types/http";
import { FetchResponse, MovieDetailItem, MovieDetailResponse, MovieItem, MovieItemResponse } from "../types/movies";

const BASE_URL = "https://api.themoviedb.org/3";

interface UrlOption {
  page?: number;
  query?: string;
}

class MovieFetcher {
  private movieFetcher: HttpFetcher;

  private MOVIE_API_END_POINT = {
    popular: "movie/popular?",
    search: "search/movie?",
    detail: "movie/",
  } as const;

  constructor(baseUrl: string) {
    this.movieFetcher = new Fetcher(baseUrl);
  }

  private createMovieFetchUrl(options: UrlOption = {}): string {
    const { page, query } = options;

    if (!process.env.API_KEY) return "";

    const requestUrl = new URLSearchParams({
      api_key: process.env.API_KEY,
      language: "ko-KR",
    });

    if (page) {
      requestUrl.append("page", String(page));
    }

    if (query) {
      requestUrl.append("query", query);
    }

    return requestUrl.toString();
  }

  private formattingMovieDetailResponse(movie: MovieDetailResponse): MovieDetailItem {
    const formattedGenres = movie.genres.map(({ name }) => name);

    return {
      id: movie.id,
      title: movie.title,
      imagePath: movie.poster_path,
      voteAverage: movie.vote_average,
      genres: formattedGenres,
      overview: movie.overview,
    };
  }

  private formattingMovieListResponse(movies: MovieItemResponse[]): MovieItem[] {
    return movies.map((movie) => {
      return {
        id: movie.id,
        title: movie.title,
        imagePath: movie.poster_path,
        voteAverage: movie.vote_average,
      };
    });
  }

  private async getMovieData(url: string): Promise<MovieItem[] | undefined> {
    const response = await this.movieFetcher.get<FetchResponse<MovieItemResponse[]>>(url);
    const popularMovies = this.formattingMovieListResponse(response.results);

    return popularMovies;
  }

  public async getPopularMovies(page: number): Promise<MovieItem[] | undefined> {
    const url = this.MOVIE_API_END_POINT.popular + this.createMovieFetchUrl({ page });

    return await this.getMovieData(url);
  }

  public async getSearchMovies(page: number, query: string): Promise<MovieItem[] | undefined> {
    const url = this.MOVIE_API_END_POINT.search + this.createMovieFetchUrl({ page, query });

    return await this.getMovieData(url);
  }

  public async getMovieDetail(id: string): Promise<MovieDetailItem | undefined> {
    const url = this.MOVIE_API_END_POINT.detail + id + "?" + this.createMovieFetchUrl();

    const response = await this.movieFetcher.get<MovieDetailResponse>(url);

    const formattedMovieDetail = this.formattingMovieDetailResponse(response);

    return formattedMovieDetail;
  }
}

export default new MovieFetcher(BASE_URL);
