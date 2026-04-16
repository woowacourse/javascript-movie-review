import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";

export async function fetchCurrentModeData(nextPage: number, isSearch: boolean, searchValue: string) {
  if (isSearch) {
    return await searchMovies(nextPage, searchValue);
  }
  return await getMovies(nextPage);
}
