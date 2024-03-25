import ApiSchema from '../common/apiSchema';
import { isMovieErrorStatusCode } from './movie.util';

class MovieAPI {
  static ERROR_MESSAGES_MAP = {
    401: 'API 키가 누락되었거나 잘못되었습니다.',
    403: '사용자가 요청한 작업을 수행할 권한이 없습니다.',
  };

  private static handleProcessStatusCode(response: Response) {
    if (!isMovieErrorStatusCode(response.status)) return;

    throw new Error(MovieAPI.ERROR_MESSAGES_MAP[response.status]);
  }

  private static buildPopularMoviesURL(page: number) {
    const endpoint = `${process.env.BASE_URL}/movie/popular`;

    const params = new URLSearchParams({
      api_key: process.env.API_KEY,
      language: 'ko',
      page: String(page),
    });

    return `${endpoint}?${params.toString()}`;
  }

  static async fetchPopularMovies(page: number) {
    const response = await new ApiSchema(this.buildPopularMoviesURL(page)).request();
    this.handleProcessStatusCode(response);

    return response.json();
  }

  private static buildSearchMoviesURL(page: number, searchValue: string) {
    const endpoint = `${process.env.BASE_URL}/search/movie`;

    const params = new URLSearchParams({
      query: searchValue,
      api_key: process.env.API_KEY,
      language: 'ko',
      page: String(page),
    });

    return `${endpoint}?${params.toString()}`;
  }

  static async fetchSearchMovies(page: number, searchValue: string) {
    const response = await new ApiSchema(this.buildSearchMoviesURL(page, searchValue)).request();
    this.handleProcessStatusCode(response);

    return response.json();
  }

  private static buildMovieDetailAPI(key: number) {
    const endpoint = `${process.env.BASE_URL}/movie/${key}`;

    const params = new URLSearchParams({
      api_key: process.env.API_KEY,
      language: 'ko',
    });

    return `${endpoint}?${params.toString()}`;
  }

  static async fetchMovieDetail(key: number) {
    const response = await new ApiSchema(this.buildMovieDetailAPI(key)).request();
    this.handleProcessStatusCode(response);

    return response.json();
  }
}

export default MovieAPI;
