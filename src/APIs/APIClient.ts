import { ERROR_MESSAGES } from "../constants/config";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const BASE_URL = import.meta.env.VITE_TMDB_API_URL;
const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

class APIClient {
  static async get(endpoint: string) {
    return this.request("GET", endpoint);
  }

  static async request(method: HttpMethod, endpoint: string) {
    const url = `${BASE_URL}${endpoint}`;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${API_KEY}`,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || ERROR_MESSAGES.NO_RESULT);
      }

      return data;
    } catch (error) {
      throw error;
    }
  }
}

export default APIClient;
