import { MovieDetail } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchMovieDetail = async (id: string) => {
  const response = await tmdbApi<MovieDetail>(`/movie/${id}`, "GET", {
    language: "ko-KR",
  });

  return response;
};
