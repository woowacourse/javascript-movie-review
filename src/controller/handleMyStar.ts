import { currentMovieModel } from "../model/currentMovieModel";

export async function handleMyStar(score: number) {
  await currentMovieModel.saveRating( score);
};
