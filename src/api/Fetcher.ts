import CustomError from '../utils/CustomError';

export interface DataFetcher {
  getData<T>(url: string, headers: HeadersInit): Promise<T>;
}

export interface ErrorResponse {
  status: number;
  response: Response;
}

export interface ErrorData {
  status_message: string;
}

class Fetcher {
  async getData<T>(url: string, headers: HeadersInit): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers(headers),
    });

    if (!response.ok) await this.#handleErrorResponse({ status: response.status, response });

    return response.json();
  }

  async #handleErrorResponse({ status, response }: ErrorResponse) {
    const { status_message }: ErrorData = await response.json();

    if (status === 400) throw new CustomError(status_message, status);
    if (status === 401) throw new CustomError(status_message, status);
    if (status === 403) throw new CustomError('Forbidden', status);
    if (status === 404) throw new CustomError(status_message, status);
    if (status === 500) throw new CustomError('Internal Server Error', status);
    if (status === 501) throw new CustomError('Not Implemented', status);
    if (status === 502) throw new CustomError('Bad Gateway', status);
    if (status === 503) throw new CustomError('Service Unavailable', status);
  }
}

export default Fetcher;
