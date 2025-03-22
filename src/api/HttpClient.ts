import type { ApiContract } from "./types";

export class HttpClient implements ApiContract {
  #baseURL: string;
  #headers: Record<string, string>;
  #errorRenderer: () => void;

  constructor(
    baseURL: string,
    headers: Record<string, string>,
    errorRenderer: () => void
  ) {
    this.#baseURL = baseURL;
    this.#headers = headers;
    this.#errorRenderer = errorRenderer;
  }

  #buildUrl(endpoint: string, params?: Record<string, any>): string {
    const query =
      params && Object.keys(params).length
        ? "?" + new URLSearchParams(params as Record<string, string>).toString()
        : "";
    return `${this.#baseURL}${endpoint}${query}`;
  }

  async get<T>(endpoint: string, params?: Record<string, any>): Promise<T> {
    const url = this.#buildUrl(endpoint, params);
    try {
      const res = await fetch(url, {
        method: "GET",
        headers: this.#headers,
      });
      if (!res.ok)
        throw new Error(`HTTP Error: ${res.status} ${res.statusText}`);
      return await res.json();
    } catch (error) {
      console.error("HttpClient GET Error:", error);
      this.#errorRenderer();
      throw error;
    }
  }
}
