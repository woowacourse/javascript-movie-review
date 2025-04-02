import TmdbApi, { Genre } from "../../api/tmdbApi";
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
    const response = await this.api.popularMovies(page).catch((error) => {
      console.error("영화 목록 가져오기 실패:", error);
      throw error;
    });

    return {
      movies: response.results.map(
        (movie) =>
          new Movie({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path || "",
            voteAverage: movie.vote_average,
            overview: movie.overview,
          })
      ),
      page: response.page,
      totalPages: response.total_pages,
    };
  }

  async searchMovies(
    query: string | undefined,
    page: number = 1
  ): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    const validQuery = query ?? "";
    const response = await this.api
      .searchMovies(validQuery, page)
      .catch((error) => {
        console.error("검색 영화 목록 가져오기 실패", error);
        throw error;
      });

    return {
      movies: response.results.map(
        (movie) =>
          new Movie({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path || "",
            voteAverage: movie.vote_average,
            overview: movie.overview,
          })
      ),
      page: response.page,
      totalPages: response.total_pages,
    };
  }

  async getMovieDetail(movieId: number): Promise<{
    genres: Genre[];
    releaseDate: string;
  }> {
    const response = await this.api.getMovieDetail(movieId).catch((error) => {
      console.error("영화 장르 가져오기 실패", error);
      throw error;
    });

    return { genres: response.genres, releaseDate: response.release_date };
  }
}
