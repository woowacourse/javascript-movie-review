import { MovieDetail } from "../types";
import tmdbApi from "./tmdbApi";

export const fetchMovieDetail = async (id: string) => {
  const response = await tmdbApi<MovieDetail>({
    endpoint: `/movie/${id}`,
    method: "GET",
    params: {
      language: "ko-KR",
    },
  });

  return response;
};
