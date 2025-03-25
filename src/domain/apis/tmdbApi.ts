import api from "../../apis/api";
import { HttpMethod } from "../../apis/api";
import { ERROR_MESSAGE } from "../constants/errorMessage";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

const tmdbApi = async (endpoint: string, method: HttpMethod, params = {}) => {
  try {
    const response = await api(BASE_URL, TOKEN, endpoint, method, params);

    if (response.success === false && "status_code" in response) {
      throw new Error(response.status_code);
    }
    return response;
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(
        ERROR_MESSAGE[Number(error.message)] ?? "네트워크 에러입니다."
      );
    }
  }
};

export default tmdbApi;
