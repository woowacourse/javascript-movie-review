import { MovieItemType } from "../types/movieResultType";
import baseApi from "./baseApi";

export const getDetailMovieResult = async (id: number): Promise<MovieItemType> => {
  const movieResult = await baseApi(`/movie/${id}`);

  return movieResult;
};
