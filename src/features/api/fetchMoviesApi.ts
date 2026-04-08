import { API_KEY, BASE_URL } from "../../constants/constant";
import { MovieResponse } from "../../../types/types";

export async function fetchMoviesApi(
  path: string,
  page: number,
  params: string = "",
): Promise<MovieResponse> {
  const queryUrl: string =
    params === "" ? "" : `&query=${encodeURIComponent(params)}`;

  try {
    const response = await fetch(
      `${BASE_URL}/${path}?api_key=${API_KEY}${queryUrl}&language=ko-KR&page=${page}`,
    );
    if (!response.ok) {
      throw new Error(`HTTP ERROR: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    if (error instanceof TypeError) {
      throw new Error("REQUEST ERROR");
    }
    if (error instanceof Error) {
      throw error;
    }

    throw new Error("UNKNOWN ERROR");
  }
}
