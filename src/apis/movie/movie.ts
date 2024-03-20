import ApiSchema from '../common/apiSchema';
import { FetchMovieType } from './movie.type';

const createMovieURLParams = (page: number, query?: string) => {
  return new URLSearchParams({
    ...(query && { query }),
    api_key: process.env.API_KEY,
    language: 'ko',
    page: String(page),
  });
};

class MovieAPI {
  static URL_MAP = {
    popular: (queryString: string) => `${process.env.BASE_URL}/movie/popular?${queryString}`,
    search: (queryString: string) => `${process.env.BASE_URL}/search/movie?${queryString}`,
  } as const;

  private static handleProcessStatusCode(response: Response) {
    switch (response.status) {
      case 401:
        throw new Error('API 키가 누락되었거나 잘못되었습니다.');
      case 403:
        throw new Error('사용자가 요청한 작업을 수행할 권한이 없습니다.');
      case 404:
        throw new Error('서버가 요청받은 리소스를 찾을 수 없습니다.');
    }
  }

  static async fetchMovieDetails<T>(page: number, type: FetchMovieType = 'popular'): Promise<T | undefined> {
    const queryString = createMovieURLParams(page, type === 'popular' ? '' : type).toString();
    const requestUrl = MovieAPI.URL_MAP[type === 'popular' ? 'popular' : 'search'](queryString);

    const response = await new ApiSchema(requestUrl).request();

    if (response) {
      this.handleProcessStatusCode(response);

      return response.json();
    }
  }
}

export default MovieAPI;
