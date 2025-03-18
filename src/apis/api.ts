export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class HTTPClient {
  baseUrl: string = "";
  apiKey: string = "";

  constructor(baseUrl: string, apiKey: string) {
    this.baseUrl = baseUrl;
    this.apiKey = apiKey;
  }

  async get(url: string) {
    const response = await fetch(this.baseUrl + url, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${this.apiKey}`,
      },
    });

    return response.json();
  }
}

export const tmdbClient = new HTTPClient(BASE_URL, TMDB_API_KEY);
