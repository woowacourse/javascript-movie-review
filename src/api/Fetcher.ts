import Movies from '../domain/Movies';

export interface DataFetcher {
  getData<T>(url: string, headers: HeadersInit): Promise<T>;
}

class Fetcher {
  async getData<T>(url: string, headers: HeadersInit): Promise<T> {
    const response = await fetch(url, {
      method: 'GET',
      headers: new Headers(headers),
    });

    if (!response.ok) await Movies.handleErrorResponse(response);

    return response.json();
  }
}

export default Fetcher;
