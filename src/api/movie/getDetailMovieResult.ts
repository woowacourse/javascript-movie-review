import { ApiWrapper } from "../ApiWrapper";
import baseApi from "../baseApi";

export const getDetailMovieResult = async (id: number) => {
  const movieResult = await ApiWrapper(() => baseApi(`/movie/${id}`));

  return movieResult;
};
