import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';

/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-useless-catch */

export class TMDBApi {
  activeHttpRequests: AbortController[] = [];

  constructor() {
    this.activeHttpRequests = [];
  }

  async sendRequest(url: string, method = 'GET', body = null, headers = {}) {
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
      return await res.json();
    } catch (err) {
      throw err;
    }
  }

  cleanup() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}

const tmdbApi = new TMDBApi();

export default tmdbApi;
