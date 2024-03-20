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
        throw new Error('엑세스 토큰 에러');
      case 403:
        throw new Error('인증 에러');
    }
  }

  static async fetchMovieDetails<T>(page: number, type: FetchMovieType = 'popular'): Promise<T | undefined> {
    try {
      const queryString = createMovieURLParams(page, type === 'popular' ? '' : type).toString();
      const requestUrl = MovieAPI.URL_MAP[type === 'popular' ? 'popular' : 'search'](queryString);

      const response = await new ApiSchema(requestUrl).request();

      if (response) {
        this.handleProcessStatusCode(response);

        return response.json();
      }
    } catch (error: unknown | Error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }
}

export default MovieAPI;
