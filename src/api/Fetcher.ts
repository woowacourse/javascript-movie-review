import { ErrorRetry } from '../components/Error/ErrorRetry/ErrorRetry';
import Toast from '../components/Toast/Toast';
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
        .catch(err => {
          new Toast(err.message);
          ErrorRetry({ errorType: err.message, fetchData: () => this.get() });
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
      throw new Error('SERVER_ERROR');
    }
    if (status === 401) {
      throw new Error('AUTHENTICATION_FAILED');
    }
    if (status >= 400) {
      throw new Error('FETCHING_ERROR');
    }
    throw new Error('NETWORK_ERROR');
  }
}

export default Fetcher;
