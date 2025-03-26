import { MOVIE_API_PARAMS, DETAIL_MOVIE_URL } from "../constants/constants";
import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function getDetailMovie(id: Number): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `${DETAIL_MOVIE_URL}/${id}?${MOVIE_API_PARAMS.ADULT_CONTENT}&${MOVIE_API_PARAMS.LANGUAGE}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
