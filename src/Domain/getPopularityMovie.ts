import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function getPopularityMovie(
  page: Number
): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `https://api.themoviedb.org/3/movie/popular?language=ko-KR&page=${page}`
    );
    return data;
  } catch (error) {
    return null;
  }
}
