import { ENV } from './env';
import HttpError from './HttpError';

export const API_OPTION = {
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${ENV.VITE_TMDB_HEADER}`,
  },
};

export default class Fetcher {
  private baseUrl: string;
  private currentController: AbortController[] = [];

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  public async get<T>(url: string): Promise<T> {
    this.cleanUp();

    const curHttpCtrl = new AbortController();
    this.currentController.push(curHttpCtrl);

    try {
      const response = await fetch(`${this.baseUrl}/${url}`, {
        headers: {
          accept: 'application/json',
          Authorization: `Bearer ${ENV.VITE_TMDB_HEADER}`,
        },
        method: 'GET',
        signal: curHttpCtrl.signal,
      });

      if (!response.ok) {
        throw new HttpError(response.status);
      }

      return response.json();
    } catch (error) {
      if (error instanceof DOMException && error.name === 'AbortError') {
        return new Promise(() => {});
      }
      throw error;
    } finally {
      const index = this.currentController.indexOf(curHttpCtrl);

      if (index > -1) {
        this.currentController.splice(index, 1);
      }
    }
  }

  cleanUp() {
    this.currentController.forEach((abortCtrl) => abortCtrl.abort());
  }
}
