import APIError from "../error/APIError";

type Url = string;

export default class Fetcher {
  private baseUrl: Url;
  private header?: HeadersInit;

  constructor(baseUrl: Url, header: HeadersInit) {
    this.baseUrl = baseUrl;
    this.header = header;
  }

  async get<T = any>(path: string): Promise<T> {
    const response = await fetch(`${this.baseUrl}${path}`, {
      headers: this.header,
    });

    if (response.ok) {
      return response.json();
    } else {
      throw new APIError(response.status);
    }
  }
}
