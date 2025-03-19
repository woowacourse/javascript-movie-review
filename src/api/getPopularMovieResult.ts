import baseApi from "./baseApi";

export const getPopularMovieResult = async (page: number) => {
  const movieResult = await baseApi("/movie/popular", page);

  return movieResult;
};
