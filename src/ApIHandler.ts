import onError from "./ErrorHandler";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

export default class APIHandler {
  static async get(endpoint: string, headers = {}) {
    return this.request("GET", endpoint, headers);
  }

  static async request(method: HttpMethod, endpoint: string, headers = {}) {
    const url = `${import.meta.env.VITE_REQUEST_URL}` + `${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_API_KEY}`,
        ...headers,
      },
    };

    try {
      const response = await fetch(url, options);

      if (!response.ok) {
        onError(response.status);
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      onError(0);
      return [];
    }
  }
}
