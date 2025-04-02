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

  const response = await tmdbClient.get(`/search/movie?${params.toString()}`);

  if ("status_message" in response) {
    throw new Error(response.status_message);
  }

  return response;
};

export default getSearchedMovieList;
