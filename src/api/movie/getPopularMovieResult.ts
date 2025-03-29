import { ApiWrapper } from "../ApiWrapper";
import baseApi from "../baseApi";

export const getPopularMovieResult = async (page: number) => {
  const movieResult = await ApiWrapper(() => baseApi("/movie/popular", { page }));

  return movieResult;
};
