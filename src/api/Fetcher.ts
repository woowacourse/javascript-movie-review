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
    if (Math.floor(status / 100) === 5)
      throw new CustomError('서버에 문제가 발생했습니다. 다시 시도해보시겠어요?', status);
  }
}

export default Fetcher;
