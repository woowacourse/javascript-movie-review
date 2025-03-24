import { BASE_URL, TMDB_TOKEN } from "../constants/api.ts";
import ERROR from "../constants/error.ts";

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
      return await response.json();
    } catch (error) {
      if (error instanceof Error) alert(ERROR.FAIL_CONNECT);
    }
  },
};

export default api;
