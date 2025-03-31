import ErrorUI from "../components/ErrorUI.ts";
import { BASE_URL, TMDB_TOKEN } from "../constants/api.ts";
import { ERROR } from "../constants/error.ts";

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
        if (error.message.includes(ERROR.NETWORK_ERROR_MESSAGE)) {
          const errorUI = new ErrorUI({ message: ERROR.DEFAULT });
          errorUI.create();
          errorUI.renderError();
        } else {
          throw error;
        }
      }
    }
  },
};

export default api;
