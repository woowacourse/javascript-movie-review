import { MOVIE_SCORE_MESSAGE } from './MovieScoreBoard.constant';

export const isMovieRateScore = (rateScore: number): rateScore is keyof typeof MOVIE_SCORE_MESSAGE => {
  return rateScore in MOVIE_SCORE_MESSAGE;
};
