export const BASE_URL = import.meta.env.VITE_BASE_URL;
export const TMDB_API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class HTTPClient {
  baseUrl: string = "";
  apiKey: string = "";

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async get(url: string) {
    const headers = {
      "Content-Type": "application/json",
      ...(this.apiKey && { Authorization: `Bearer ${this.apiKey}` }),
    };

    const response = await fetch(this.baseUrl + url, {
      headers,
    });

    return response.json();
  }

  setApiKey(apiKey: string) {
    this.apiKey = apiKey;
  }
}

export const tmdbClient = new HTTPClient(BASE_URL);
tmdbClient.setApiKey(TMDB_API_KEY);
