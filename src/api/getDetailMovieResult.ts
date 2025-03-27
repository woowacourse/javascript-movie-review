import baseApi from "./baseApi";

export const getDetailMovieResult = async (id: number) => {
  const movieResult = await baseApi(`/movie/${id}`);

  return movieResult;
};
