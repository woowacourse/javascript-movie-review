import ApiSchema from '../common/apiSchema';

import { isMovieErrorStatusCode } from './movie.util';

class MovieAPI {
  static ERROR_MESSAGES_MAP = {
    401: 'API 키가 누락되었거나 잘못되었습니다.',
    403: '사용자가 요청한 작업을 수행할 권한이 없습니다.',
  };

  private static getAPIEndpoint(type: string) {
    return type === 'popular' ? `${process.env.BASE_URL}/movie/popular` : `${process.env.BASE_URL}/search/movie`;
  }

  private static createMovieQueryString(page: number, query?: string) {
    const params = new URLSearchParams({
      api_key: process.env.API_KEY,
      language: 'ko',
      page: String(page),
    });

    if (query) {
      params.append('query', query);
    }

    return params.toString();
  }

  private static handleProcessStatusCode(response: Response) {
    if (!isMovieErrorStatusCode(response.status)) return;

    throw new Error(MovieAPI.ERROR_MESSAGES_MAP[response.status]);
  }

  static async fetchMovieDetails<T>(page: number, type: string): Promise<T> {
    const requestType = type === 'popular' ? '' : type;
    const requestUrl = `${this.getAPIEndpoint(type)}?${MovieAPI.createMovieQueryString(page, requestType)}`;

    const response = await new ApiSchema(requestUrl).request();

    this.handleProcessStatusCode(response);

    return response.json();
  }
}

export default MovieAPI;
