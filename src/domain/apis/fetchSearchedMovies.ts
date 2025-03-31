import { MovieData } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchSearchedMovies = async (searchKeyword: string, page = 1) => {
  const response = await tmdbApi<MovieData>({
    endpoint: "/search/movie",
    method: "GET",
    params: {
      language: "ko-KR",
      page,
      query: searchKeyword,
    },
  });

  return response;
};
