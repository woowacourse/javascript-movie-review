import TmdbApi, {
  TmdbApiError,
  APIResponse,
  MovieResponse,
  MovieDetailResponse,
} from '../domain/tmdbApi';
import Movie from '../domain/Movie';

export default class MovieService {
  private api: TmdbApi;
  constructor(tmdbApi: TmdbApi) {
    this.api = tmdbApi;
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
      const response = await this.api.popularMovies(page);
      return this.convertToMovies(response);
    } catch (error) {
      console.error('영화 목록 가져오기 실패:', error);
      let errorMessage = '영화 목록 가져오기 실패';
      if (error instanceof TmdbApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      alert(errorMessage);
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
      const response = await this.api.searchMovies(query, page);
      return this.convertToMovies(response);
    } catch (error) {
      console.error('영화 검색 실패', error);
      let errorMessage = '영화 검색 실패';
      if (error instanceof TmdbApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }

      alert(errorMessage);
      throw error;
    }
  }

  async getMovieDetail(movieId: number): Promise<MovieDetailResponse> {
    try {
      return await this.api.getMovieDetail(movieId);
    } catch (error) {
      console.error('영화 상세 정보 가져오기 실패', error);
      let errorMessage = '영화 상세 정보 가져오기 실패';
      if (error instanceof TmdbApiError) {
        errorMessage = error.message;
      } else if (error instanceof Error) {
        errorMessage = error.message;
      }
      throw error;
    }
  }
}
