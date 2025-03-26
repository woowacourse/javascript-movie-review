import { MovieData } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchPopularMovies = async (page = 1): Promise<MovieData> => {
  const response = await tmdbApi("/movie/popular", "GET", {
    language: "ko-KR",
    page,
  });

  return response;
};
