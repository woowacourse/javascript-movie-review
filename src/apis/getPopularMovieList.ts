import { MovieData } from "../../types/type";
import { tmdbClient } from "./api";

const getPopularMovieList = async (page: number): Promise<MovieData> => {
  const response = await tmdbClient.get(
    `/movie/popular?language=ko-KR&page=${page}`
  );

  if ("status_message" in response) {
    throw new Error(response.status_message);
  }

  return response;
};

export default getPopularMovieList;
