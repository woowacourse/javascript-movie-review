import HttpError from '../error/HttpError';
import ERROR_MESSAGE from '../constants/api/messages';
import { FetchOption } from '../types/fetch';

/* eslint-disable max-depth */
/* eslint-disable max-lines-per-function */
/* eslint-disable no-useless-catch */
export class Api {
  activeHttpRequests: AbortController[] = [];

  constructor() {
    this.activeHttpRequests = [];
  }

  async sendRequest(url: string, { method = 'GET', body = null, headers = {} }: Partial<FetchOption>) {
    this.cleanup();

    const httpAbortCtrl = new AbortController();
    if (httpAbortCtrl instanceof AbortController) {
      this.activeHttpRequests.push(httpAbortCtrl);
    }
    const res = await fetch(url, {
      method: method,
      body,
      headers: headers,
      signal: httpAbortCtrl.signal,
    });

    this.activeHttpRequests = this.activeHttpRequests.filter((reqCtrl) => reqCtrl !== httpAbortCtrl);

    if (!res.ok) {
      const error = new HttpError(ERROR_MESSAGE.FAIL_FETCH, res.status);
      throw error;
    }

    const data = res.json();

    return data;
  }

  cleanup() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}

export const api = new Api();
