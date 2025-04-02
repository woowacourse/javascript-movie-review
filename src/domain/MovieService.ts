import { ApiError } from '../api/ApiClient';
import {
  APIResponse,
  MovieResponse,
  MovieDetailResponse,
} from '../api/tmdb/tmdbApiClient';
import Movie from './Movie';
import MovieDetail from './MovieDetail';
import Logger from '../utils/logger/Logger';

export interface MovieApiService {
  getPopularMovies: (page?: number) => Promise<APIResponse<MovieResponse>>;
  searchMovies: (
    query?: string,
    page?: number,
  ) => Promise<APIResponse<MovieResponse>>;
  getMovieDetail: (
    movieId: number,
    appendToResponse?: string,
  ) => Promise<MovieDetailResponse>;
}

export default class MovieService {
  private apiService: MovieApiService;

  constructor(apiService: MovieApiService) {
    this.apiService = apiService;
  }

  private convertToMovies(moviesData: APIResponse<MovieResponse>): {
    movies: Movie[];
    page: number;
    totalPages: number;
  } {
    return {
      movies: moviesData.results.map(
        movie =>
          new Movie({
            id: movie.id,
            title: movie.title,
            posterPath: movie.poster_path || '',
            voteAverage: movie.vote_average,
          }),
      ),
      page: moviesData.page,
      totalPages: moviesData.total_pages,
    };
  }

  async getPopularResults(page: number = 1): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await this.apiService.getPopularMovies(page);
      return this.convertToMovies(response);
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('영화 목록 가져오기 실패:', error as Error);
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert(
          '영화 정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        );
      }
      throw error;
    }
  }

  async searchMovies(
    query?: string,
    page: number = 1,
  ): Promise<{
    movies: Movie[];
    page: number;
    totalPages: number;
  }> {
    try {
      const response = await this.apiService.searchMovies(query, page);
      return this.convertToMovies(response);
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('영화 검색 실패', error as Error);
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert('영화 검색 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.');
      }
      throw error;
    }
  }

  async getMovieDetail(movieId: number): Promise<MovieDetail> {
    try {
      const response = await this.apiService.getMovieDetail(movieId);
      return MovieDetail.fromResponse(response);
    } catch (error) {
      const logger = Logger.getInstance();
      logger.error('영화 상세 정보 가져오기 실패', error as Error);
      if (error instanceof ApiError) {
        alert(error.message);
      } else {
        alert(
          '영화 상세 정보를 불러오는 중 문제가 발생했습니다. 잠시 후 다시 시도해 주세요.',
        );
      }
      throw error;
    }
  }
}
