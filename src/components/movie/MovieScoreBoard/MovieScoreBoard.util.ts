import MovieScoreBoard from './MovieScoreBoard';

export const isMovieRateScore = (rateScore: number): rateScore is keyof typeof MovieScoreBoard.MOVIE_SCORE_GUIDANCE => {
  return rateScore in MovieScoreBoard.MOVIE_SCORE_GUIDANCE;
};
