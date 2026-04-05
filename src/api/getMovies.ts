import { API_URL } from "../constants/api";
import { fetchFromApi } from "./fetchFromApi";

export async function getMovies(page: number): Promise<ApiResult<MovieResponse>> {
  return await fetchFromApi<MovieResponse>(API_URL.popular(page));
}
