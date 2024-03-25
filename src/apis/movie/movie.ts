import ApiSchema from '../common/apiSchema';

import { isMovieErrorStatusCode } from './movie.util';

class MovieAPI {
  static ERROR_MESSAGES_MAP = {
    401: 'API 키가 누락되었거나 잘못되었습니다.',
    403: '사용자가 요청한 작업을 수행할 권한이 없습니다.',
  };

  static fetchMovieDetails(page: number, type: string) {
    const query = type === 'popular' ? '' : type;
    const requestUrl = `${this.getAPIEndpoint(type)}?${MovieAPI.createMovieQueryString({
      page: String(page),
      query,
    })}`;

    return this.fetchMovieData(requestUrl);
  }

  static fetchMovieDetail(id: string) {
    const requestUrl = `${this.getAPIEndpoint('detail', id)}?${MovieAPI.createMovieQueryString()}`;

    return this.fetchMovieData(requestUrl);
  }

  private static getAPIEndpoint(type: string, id?: string) {
    switch (type) {
      case 'popular':
        return `${process.env.BASE_URL}/movie/popular`;
      case 'detail':
        return `${process.env.BASE_URL}/movie/${id}`;
      default:
        return `${process.env.BASE_URL}/search/movie`;
    }
  }

  private static createMovieQueryString(options?: Record<string, string>) {
    const params = new URLSearchParams({
      api_key: process.env.API_KEY,
      language: 'ko',
    });

    if (options) {
      Object.entries(options).forEach(([key, value]) => {
        params.append(key, value);
      });
    }

    return params.toString();
  }

  static async fetchMovieData(requestUrl: string) {
    const response = await new ApiSchema(requestUrl).request();

    if (!response) return;

    this.handleProcessStatusCode(response);

    const movieDetails = response.json();
    return movieDetails;
  }

  private static handleProcessStatusCode(response: Response) {
    if (!isMovieErrorStatusCode(response.status)) return;

    throw new Error(MovieAPI.ERROR_MESSAGES_MAP[response.status]);
  }
}

export default MovieAPI;
