import { ENV } from './env';
import HttpError from './HttpError';

export const API_OPTION = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ENV.VITE_TMBD_HEADER}`,
  },
};

export default class Fetcher {
  private baseUrl: string;
  private activeHttpRequests: AbortController[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(url: string, headers = {}): Promise<T> {
    this.cleanUp();

    const httpAbortCtrl = new AbortController();
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers,
      method: 'GET',
      signal: httpAbortCtrl.signal,
    });

    if (!response.ok) {
      throw new HttpError(response.status);
    }

    return response.json();
  }

  cleanUp() {
    this.activeHttpRequests.forEach((abortCtrl) => abortCtrl.abort());
  }
}
