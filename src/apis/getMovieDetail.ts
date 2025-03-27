import { MovieDetail } from "../../types/type";
import { tmdbClient } from "./api";

const getMovieDetail = async (movieId: number): Promise<MovieDetail> => {
  const response = await tmdbClient.get(`/movie/${movieId}?language=ko-KR`);

  if ("status_message" in response) {
    throw new Error(response.status_message);
  }

  return response;
};

export default getMovieDetail;
