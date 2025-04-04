import baseApi from "./baseApi";

export const getMovieDetailResult = async (id: number) => {
  const movieResult = await baseApi(`/movie/${id}`);

  return movieResult;
};
