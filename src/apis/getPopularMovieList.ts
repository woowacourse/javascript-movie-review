import { MovieData } from "../../types/type";
import { tmdbClient } from "./api";

const getPopularMovieList = async (page: number): Promise<MovieData> => {
  return tmdbClient.get(`/movie/popular?language=ko-KR&page=${page}`);
};

export default getPopularMovieList;
