import APIError from "../error/APIError";

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
    const url = new URL(this.baseUrl.toString());
    url.pathname = path;
    url.search = params.toString();

    const response = await fetch(url.toString(), {
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
