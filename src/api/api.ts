import { BASE_URL, TMDB_TOKEN } from "../constants/api.ts";

const options = {
  method: "GET",
  headers: {
    Authorization: `Bearer ${TMDB_TOKEN}`,
  },
};

const api = {
  async GETWithAuth(endpoint: string) {
    try {
      const url = `${BASE_URL}${endpoint}`;
      const response = await fetch(url, options);

      if (!response.ok) {
        throw new Error(response.status.toString());
      }

      return await response.json();
    } catch (error) {
      if (error instanceof Error) {
        throw error;
      }
    }
  },
};

export default api;
