import CustomError from '../components/Error/CustomError/CustomError';
import { ErrorPage } from '../components/Error/ErrorPage/ErrorPage';
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
            throw new CustomError(response.status);
          }

          return response.json();
        })
        .then(data => {
          resolve(data);
        })
        .catch(error => {
          new Toast(error.message);
          ErrorPage({ currentError: error, fetchData: () => this.get() });
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
}

export default Fetcher;
