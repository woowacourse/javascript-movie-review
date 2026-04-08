import { movieModel } from "../model/movieModel";
import { getMovies } from "../api/getMovies";
import { searchMovies } from "../api/searchMovies";

export async function fetchCurrentModeData() {
  const nextPage = movieModel.page + 1;

  if (movieModel.isSearch) {
    return await searchMovies(nextPage, movieModel.searchValue);
  }
  return await getMovies(nextPage);
}
