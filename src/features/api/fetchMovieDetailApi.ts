import { API_KEY, BASE_URL } from "../../constants/constant";
import { MovieDetailResponse } from "../../../types/types";

export async function fetchMovieDetailApi(
  id: number,
): Promise<MovieDetailResponse> {
  try {
    const response = await fetch(
      `${BASE_URL}/movie/${id}?api_key=${API_KEY}&language=ko-KR`,
    );
    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new TypeError("REQUEST ERROR");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("UNKNOWN ERROR");
  }
}
