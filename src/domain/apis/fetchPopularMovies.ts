import { MovieData } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchPopularMovies = async (page = 1) => {
  const response = await tmdbApi<MovieData>("/movie/popular", "GET", {
    language: "ko-KR",
    page,
  });

  return response;
};
