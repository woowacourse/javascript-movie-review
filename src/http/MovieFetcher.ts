import Fetcher from "./Fetcher";
import { BASE_URL } from "../constants/movies";
import { HttpFetcher } from "../types/http";
import { FetchResponse, MovieItem, MovieItemResponse } from "../types/movies";

class MovieFetcher {
  private movieFetcher: HttpFetcher;

  private MOVIE_API_END_POINT = {
    popular: "movie/popular?",
    search: "search/movie?",
  } as const;

  constructor(baseUrl: string) {
    this.movieFetcher = new Fetcher(baseUrl);
  }

  private createMovieFetchUrl(page: number, query?: string): string {
    if (!process.env.API_KEY) return "";

    const requestUrl = new URLSearchParams({
      language: "ko-KR",
      page: String(page),
      api_key: process.env.API_KEY,
    });

    query && requestUrl.append("query", query);

    return requestUrl.toString();
  }

  private formattingMovieResponse(movies: MovieItemResponse[]): MovieItem[] {
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
    const popularMovies = this.formattingMovieResponse(response.results);

    return popularMovies;
  }

  public async getPopularMovies(page: number): Promise<MovieItem[] | undefined> {
    const url = this.MOVIE_API_END_POINT.popular + this.createMovieFetchUrl(page);

    return await this.getMovieData(url);
  }

  public async getSearchMovies(page: number, query: string): Promise<MovieItem[] | undefined> {
    const url = this.MOVIE_API_END_POINT.search + this.createMovieFetchUrl(page, query);

    return await this.getMovieData(url);
  }
}

export default new MovieFetcher(BASE_URL);
