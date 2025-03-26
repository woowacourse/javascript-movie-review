import { MovieData } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchSearchedMovies = async (
  searchKeyword: string,
  page = 1
): Promise<MovieData> => {
  const response = await tmdbApi("/search/movie", "GET", {
    language: "ko-KR",
    page,
    query: searchKeyword,
  });

  return response;
};
