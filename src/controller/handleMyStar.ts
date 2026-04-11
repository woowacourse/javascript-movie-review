import { currentMovieModel } from "../model/currentMovieModel";

export function handleMyStar(score: number) {
  currentMovieModel.saveRating( score);
};
