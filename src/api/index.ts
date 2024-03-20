import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';

/* eslint-disable max-depth */
class TMDBApi {
  isLoading: boolean;

  error: Error | null;

  activeHttpRequests: AbortController[] = [];

  onLoadingChanged: (isLoading: boolean) => void;

  onErrorChanged: (error: HttpError | null) => void;

  constructor() {
    this.isLoading = false;
    this.error = null;
    this.activeHttpRequests = [];
    this.onLoadingChanged = () => {};
    this.onErrorChanged = () => {};
  }

  async sendRequest(url: string, method = 'GET', body = null, headers = {}) {
    this.setLoading(true);
    const httpAbortCtrl = new AbortController();
    if (httpAbortCtrl instanceof AbortController) {
      this.activeHttpRequests.push(httpAbortCtrl);
    }

    try {
      const res = await fetch(url, {
        method,
        body,
        headers,
        signal: httpAbortCtrl.signal,
      });

      this.activeHttpRequests = this.activeHttpRequests.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

      if (!res.ok) {
        const error = new HttpError(ERROR_MESSAGE.FAIL_FETCH, res.status);
        throw error;
      }

      this.setLoading(false);
      return await res.json();
    } catch (err) {
      this.setLoading(false);
      throw err;
    }
  }

  setLoading(isLoading: boolean) {
    this.isLoading = isLoading;
    this.onLoadingChanged(isLoading);
  }

  setError(error: HttpError) {
    this.error = error;
    this.onErrorChanged(error);
  }

  clearError() {
    this.error = null;
    this.onErrorChanged(null);
  }

  cleanup() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}

const tmdbApi = new TMDBApi();

export default tmdbApi;
