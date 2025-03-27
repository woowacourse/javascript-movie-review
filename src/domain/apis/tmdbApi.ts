import api from "../../apis/api";
import { HttpMethod } from "../../apis/api";
import { ERROR_MESSAGE } from "../constants/errorMessage";

const BASE_URL = "https://api.themoviedb.org/3";
const TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN;

interface TmdbApiFetchFailResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

const isTmdbApiFetchFailResponse = (
  response: any
): response is TmdbApiFetchFailResponse => {
  return (
    typeof response === "object" &&
    response !== null &&
    "success" in response &&
    response.success === false &&
    "status_code" in response &&
    typeof response.status_code === "number"
  );
};

const tmdbApi = async <T>(
  endpoint: string,
  method: HttpMethod,
  params = {}
) => {
  try {
    const response = await api<T>(BASE_URL, TOKEN, endpoint, method, params);

    if (isTmdbApiFetchFailResponse(response)) {
      throw new Error(response.status_code.toString());
    }

    return response;
  } catch (error) {
    if (error instanceof Error) {
      const message =
        ERROR_MESSAGE[Number(error.message)] ?? "네트워크 에러입니다.";
      throw new Error(message);
    } else {
      throw new Error("알 수 없는 에러입니다.");
    }
  }
};

export default tmdbApi;
