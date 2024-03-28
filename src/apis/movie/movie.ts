import ApiSchema from '../common/apiSchema';

import { createMovieQueryString, getAPIEndpoint, isMovieErrorStatusCode } from './movie.util';

class MovieAPI {
  static ERROR_MESSAGES_MAP = {
    401: 'API 키가 누락되었거나 잘못되었습니다.',
    403: '사용자가 요청한 작업을 수행할 권한이 없습니다.',
  };

  static fetchMovieDetails(page: number, type: string) {
    const query = type === 'popular' ? '' : type;
    const requestUrl = `${getAPIEndpoint(type)}?${createMovieQueryString({
      page: String(page),
      query,
    })}`;

    return this.fetchMovieData(requestUrl);
  }

  static fetchMovieDetail(id: string) {
    const requestUrl = `${getAPIEndpoint('detail', id)}?${createMovieQueryString()}`;

    return this.fetchMovieData(requestUrl);
  }

  static async fetchMovieData(requestUrl: string) {
    const response = await new ApiSchema(requestUrl).request();

    if (!response) return;

    this.handleProcessStatusCode(response);

    const movieDetails = await response.json();
    return movieDetails;
  }

  private static handleProcessStatusCode(response: Response) {
    if (!isMovieErrorStatusCode(response.status)) return;

    throw new Error(MovieAPI.ERROR_MESSAGES_MAP[response.status]);
  }
}

export default MovieAPI;
