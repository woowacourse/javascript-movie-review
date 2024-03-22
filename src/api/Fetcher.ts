import { ERROR_MESSAGE } from '../consts/error';
import { MovieAPIReturnType, UrlParamsType } from './movieAPI.type';

class Fetcher {
  url;
  params;

  constructor({ url, params }: { url: string; params: UrlParamsType }) {
    this.url = url;
    this.params = params;
  }

  async get(): Promise<MovieAPIReturnType> {
    const fullApiUrl = this.generateMovieApiUrl();

    console.log('fullApiUrl', fullApiUrl);

    const response = await fetch(fullApiUrl);
    this.errorHandler(response.status);
    console.log('response', response);
    const result = await response.json();
    return result;
  }

  generateMovieApiUrl() {
    const API_KEY = process.env.API_KEY;
    const queryParams = new URLSearchParams({
      api_key: API_KEY as string,
      language: 'ko-KR',
      ...this.params,
    });

    return `${this.url}?${queryParams.toString()}`;
  }

  errorHandler(status: number) {
    if (status === 400) throw new Error(ERROR_MESSAGE.FETCH_FAILED);
    else if (status === 401) throw new Error(ERROR_MESSAGE.AUTHENTICATION_FAILED);
    else if (status === 500) throw new Error(ERROR_MESSAGE.SERVER_ERROR);
    else if (status === 501) throw new Error(ERROR_MESSAGE.SERVICE_NOT_SUPPORTED);
  }
}

export default Fetcher;
