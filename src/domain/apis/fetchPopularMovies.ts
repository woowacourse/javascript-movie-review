import { MovieData } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdbApi<MovieData>({
    endpoint: "/movie/popular",
    method: "GET",
    params: {
      language: "ko-KR",
      page,
    },
  });

  return response;
};
