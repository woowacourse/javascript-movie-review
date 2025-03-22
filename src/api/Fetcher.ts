import { ENV } from './env';
import HttpError from './HttpError';

export const HEADER_OPTION = {
  accept: 'application/json',
  Authorization: `Bearer ${ENV.VITE_TMBD_HEADER}`,
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
    const response = await fetch(`${this.baseUrl}/${url}`, {
      headers: HEADER_OPTION,
      method: 'GET',
      signal: curHttpCtrl.signal,
    });

    if (!response.ok) {
      throw new HttpError(response.status);
    }

    return response.json();
  }

  cleanUp() {
    this.currentController.forEach((abortCtrl) => abortCtrl.abort());
  }
}
