import { MOVIE_API_PARAMS, SEARCH_MOVIE_URL } from "../constants/constants";
import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function searchMovie(
  page: Number,
  searchKeyword: string
): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `${SEARCH_MOVIE_URL}?query=${searchKeyword}&${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}&page=${page}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
