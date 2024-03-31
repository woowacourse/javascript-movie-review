import CustomError from '../components/Error/CustomError/CustomError';
import { ErrorRetry } from '../components/Error/ErrorRetry/ErrorRetry';
import Toast from '../components/Toast/Toast';
import { ERROR_MESSAGE } from '../consts/message';
import { MovieAPIReturnType, UrlParamsType } from './movieAPI.type';

class Fetcher {
  url;
  params?;

  constructor({ url, params }: { url: string; params?: UrlParamsType }) {
    this.url = url;
    this.params = params;
  }

  get(): Promise<MovieAPIReturnType> {
    return new Promise(resolve => {
      fetch(this.generateMovieApiUrl())
        .then(response => {
          if (!response.ok) {
            this.errorHandler(response.status);
          }

          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          new Toast(error.message);
          ErrorRetry({ currentError: error, fetchData: () => this.get() });
        });
    });
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
    if (status >= 500) {
      throw new CustomError({ name: 'SERVER_ERROR', message: ERROR_MESSAGE.SERVER_ERROR });
    }
    if (status === 404) {
      throw new CustomError({ name: 'NOT_FOUND', message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }
    if (status === 401) {
      throw new CustomError({ name: 'AUTHENTICATION_FAILED', message: ERROR_MESSAGE.RESOURCE_NOT_FOUND });
    }
    if (status >= 400) {
      throw new CustomError({ name: 'NETWORK_ERROR', message: ERROR_MESSAGE.NETWORK_ERROR });
    }
    throw new CustomError({ name: 'FETCHING_ERROR', message: ERROR_MESSAGE.FETCH_FAILED });
  }
}

export default Fetcher;
