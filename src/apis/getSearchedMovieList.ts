import { MovieData } from "../../types/type";
import { tmdbClient } from "./api";

const getSearchedMovieList = async (
  query: string,
  page: number
): Promise<MovieData> => {
  return tmdbClient.get(
    `/search/movie?query=${query}&language=ko-KR&page=${page}`
  );
};

export default getSearchedMovieList;
