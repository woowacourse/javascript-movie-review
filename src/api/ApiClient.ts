import { TMDB_TOKEN } from "../constants/env";
import ErrorMessage from "../constants/ErrorMessage";
import { BASE_URL } from "../constants/URL";

type HttpMethod = "GET" | "POST" | "PUT" | "DELETE";

const ApiClient = {
  async get<T>(endpoint: string, headers = {}) {
    return this.request<T>("GET", endpoint, headers);
  },

  async request<T>(method: HttpMethod, endpoint: string, headers = {}) {
    const url = BASE_URL + endpoint;
    const options = {
      method,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TMDB_TOKEN}`,
        ...headers,
      },
    };

    try {
      const response = await fetch(url, options);
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || ErrorMessage.API_CLIENT);
      }

      return data as T;
    } catch (error) {
      throw error;
    }
  },
};

export default ApiClient;
