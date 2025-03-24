import fetchMovies from "./fetchMovies";
import { MovieData } from "../components/movie/types";

export const getSearchedMovies = async (
  searchKeyword: string,
  pageNumber = 1
): Promise<MovieData> => {
  const query = encodeURIComponent(searchKeyword);
  return fetchMovies(
    `search/movie?query=${query}&include_adult=false&language=ko-KR&page=${pageNumber}`
  );
};
