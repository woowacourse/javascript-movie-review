import { DetailMovieData } from "../components/movie/types";
import fetchMovies from "./fetchMovies";

export const getDetailMovies = async (id: number): Promise<DetailMovieData> => {
  return fetchMovies(`movie/${id}?language=ko-KR`);
};
