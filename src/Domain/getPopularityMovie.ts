import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function getPopularityMovie(
  page: Number
): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `https://api.themoviedb.org/3/discover/movie?include_adult=false&include_video=false&language=ko-KR&page=${page}&sort_by=popularity.desc`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
