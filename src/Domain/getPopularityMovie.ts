import { MOVIE_API_PARAMS, POPULAR_MOVIE_URL } from "../constants/constants";
import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function getPopularityMovie(
  page: Number
): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `${POPULAR_MOVIE_URL}?${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
