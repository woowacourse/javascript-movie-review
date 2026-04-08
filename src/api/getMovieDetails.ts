import { API_URL } from "../constants/api";
import { fetchFromApi } from "./fetchFromApi";

export async function getMovieDetails(page: number): Promise<ApiResult<MovieModalData>> {
  return await fetchFromApi<MovieModalData>(API_URL.details(page));
};
