import { VOTE } from "../constants/movie.ts";
import movieService from "../service/movieService.ts";

export const getMovieRate = (movieId: number) => {
  const totalRates = movieService.getRateList();
  const targetRate = totalRates.find(({ id }: { id: number }) => {
    return id === movieId;
  });

  return targetRate ?? VOTE.defaultRate;
};
