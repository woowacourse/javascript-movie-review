import { MovieData } from "../components/movie/types";
import fetchMovies from "./fetchMovies";

export const getPopularMovies = async (page = 1): Promise<MovieData> => {
  return fetchMovies(`movie/popular?language=ko-KR&page=${page}`);
};
