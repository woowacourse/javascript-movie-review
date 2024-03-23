export interface DataFetcher {
  getData<T>(url: string, headers: HeadersInit): Promise<T>;
}

export interface ErrorResponse {
  status: number;
  response: ResponseInit;
}

class Fetcher {
  async getData<T>(url: string, headers: HeadersInit): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers(headers),
    });

    if (!response.ok) this.#handleErrorResponse({ status: response.status, response });

    return response.json();
  }

  #handleErrorResponse({ status }: ErrorResponse) {
    if (status === 401) throw new Error('401-Unauthorized');
    if (status === 404) throw new Error('404-Not Found');
    if (status === 500) throw new Error('500-Internal Server Error');
    if (status === 503) throw new Error('503-Service Unavailable');
  }
}

export default Fetcher;
