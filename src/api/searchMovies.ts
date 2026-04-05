import { API_URL } from "../constants/api";
import { fetchFromApi } from "./fetchFromApi";

export async function searchMovies(page: number,query: string,): Promise<ApiResult<MovieResponse>> {
  return await fetchFromApi<MovieResponse>(API_URL.search(query, page));
}
