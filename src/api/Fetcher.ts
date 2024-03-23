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

  // TODO: 에러 처리 추가
  async #handleErrorResponse({ status, response }: ErrorResponse) {
    const { status_message }: ErrorData = await response.json();

    if (status === 400) throw new Error(`${status}-${status_message}`);
    if (status === 401) throw new Error(`${status}-${status_message}`);
    if (status === 404) throw new Error(`${status}-${status_message}`);
    if (status === 500) throw new Error(`${status}-Internal Server Error`);
    if (status === 503) throw new Error(`${status}-Service Unavailable`);
  }
}

export default Fetcher;
