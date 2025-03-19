import { ApiResponse } from "../types/movie";
import { getFetchData } from "../utils/getFetchData";

export async function searchMovie(
  page: Number,
  searchKeyword: string
): Promise<ApiResponse | null> {
  try {
    const data = await getFetchData<ApiResponse>(
      `https://api.themoviedb.org/3/search/movie?query=${searchKeyword}&include_adult=false&language=ko-KR&page=${page}`
    );
    console.log(data);
    return data;
  } catch (error) {
    console.error(error);
    return null;
  }
}
