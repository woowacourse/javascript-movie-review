import TmdbApi, { TmdbApiError, APIResponse, MovieResponse } from "../../api/tmdbApi";
import Movie from "../models/Movie";

export default class MovieService {
  private api: TmdbApi;
  constructor(tmdbApi: TmdbApi) {
    this.api = tmdbApi;
  }

  async getPopularResults(page: number = 1): Promise<APIResponse<MovieResponse>> {
    try {
      return await this.api.popularMovies(page);
    } catch (error) {
      console.error("영화 목록 가져오기 실패:", error);
      let errorMessage = "영화 목록 가져오기 실패";
      if(error instanceof TmdbApiError) {
        errorMessage = error.message;
      }else if(error instanceof Error){
        errorMessage = error.message;
      }
      alert(errorMessage);
      throw error;
    }
  }

  async searchMovies(
    query?: string,
    page: number = 1
  ): Promise<APIResponse<MovieResponse>> {
    try {
      return await this.api.searchMovies(query, page);
    } catch (error) {
      console.error("영화 검색 실패", error);
      let errorMessage = "영화 검색 실패";
      if (error instanceof TmdbApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      
      alert(errorMessage);
      throw error;
    }
  }
}
