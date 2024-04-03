import APIError from "../errors/APIError";

type URLString = string;

interface APIClientInterface {
  get<T = any>(path: string, params: URLSearchParams): Promise<T>;
}

export default class APIClient implements APIClientInterface {
  private baseUrl: URL;
  private header?: Headers;

  constructor(baseUrl: URLString, header: HeadersInit) {
    this.baseUrl = new URL(baseUrl);
    this.header = new Headers(header);
  }

  async get<T = any>(path: string, params: URLSearchParams): Promise<T> {
    const url = `${this.baseUrl.toString()}${path}?${params.toString()}`;

    const response = await fetch(url, {
      headers: this.header,
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      throw new APIError(response.status);
    }
  }
}
