import { MovieListData } from "../../types/type";
import { tmdbClient } from "./api";

const getSearchedMovieList = async (
  query: string,
  page: number
): Promise<MovieListData> => {
  const params = new URLSearchParams({
    query: query,
    language: "ko-KR",
    page: page.toString(),
  });

  return await tmdbClient.get(`/search/movie?${params.toString()}`);
};

export default getSearchedMovieList;
