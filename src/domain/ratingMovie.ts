import { VOTE } from "../constants/movie.ts";
import movieService from "../service/movieService.ts";

export const getMovieRate = (movieId: number) => {
  const totalRates = movieService.getRateList();
  const targetRate = totalRates.find(({ id }: { id: number }) => {
    return id === movieId;
  });

  return targetRate ?? VOTE.defaultRate;
};

export const ratingMovie = (id: number, rate: number) => {
  const movieRate = { id, rate };
  const isRated = movieService.checkHasRated(id);
  if (isRated) {
    movieService.updateRateById(id, movieRate);
    return;
  }

  movieService.addRate(movieRate);
};
