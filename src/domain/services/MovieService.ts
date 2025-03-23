import TmdbApi from "../../api/tmdbApi";
import Movie from "../models/Movie";

export default class MovieService {
  private api: TmdbApi;
  constructor(apiKey: string, baseUrl: string) {
    this.api = new TmdbApi(apiKey, baseUrl);
  }

  async getPopularResults(page: number = 1): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await this.api.popularMovies(page);
      return {
        movies: response.results.map(
          (movie) =>
            new Movie({
              id: movie.id,
              title: movie.title,
              posterPath: movie.poster_path || "",
              voteAverage: movie.vote_average,
            })
        ),
        page: response.page,
        totalPages: response.total_pages,
      };
    } catch (error) {
      console.error("영화 목록 가져오기 실패:", error);
      alert("영화 목록 가져오기 실패");
      throw error;
    }
  }

  async searchMovies(
    query: string | undefined,
    page: number = 1
  ): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    try {
      const validQuery = query ?? "";
      const response = await this.api.searchMovies(validQuery, page);
      return {
        movies: response.results.map(
          (movie) =>
            new Movie({
              id: movie.id,
              title: movie.title,
              posterPath: movie.poster_path || "",
              voteAverage: movie.vote_average,
            })
        ),
        page: response.page,
        totalPages: response.total_pages,
      };
    } catch (error) {
      console.error("영화 검색 실패", error);
      alert("영화 검색 실패");
      throw error;
    }
  }
}
