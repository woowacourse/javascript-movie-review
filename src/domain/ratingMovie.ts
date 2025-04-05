import { VOTE } from "../constants/movie.ts";

export const getMovieRate = (
  movieRate: { id: number; rate: number } | null
) => {
  return movieRate ? movieRate.rate : VOTE.defaultRate;
};

export const calculateFilledStar = (rate: number) => {
  return rate / VOTE.unitRate;
};
