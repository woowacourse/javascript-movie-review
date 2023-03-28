import { MovieScore, ScoreBoard, ScoreComment } from "../@types/movieDataType";

export const MOVIE_DATA = {
  EMPTY: 0,
  INIT_PAGE: 0,
};

export const MOVIE_SCORE: MovieScore = {
  NO_SCORE: -1,
  WORST: 0,
  BAD: 1,
  NORMAL: 2,
  GOOD: 3,
  BEST: 4,
};

export const SCORE_BOARD: ScoreBoard = {
  0: 2,
  1: 4,
  2: 6,
  3: 8,
  4: 10,
  "-1": 0,
};

export const SCORE_COMMENT: ScoreComment = {
  [MOVIE_SCORE.NO_SCORE]: "별점을 입력해주세요🥺",
  [MOVIE_SCORE.WORST]: "최악이예요🤬",
  [MOVIE_SCORE.BAD]: "별로예요😓",
  [MOVIE_SCORE.NORMAL]: "보통이에요🤨",
  [MOVIE_SCORE.GOOD]: "재미있어요😝",
  [MOVIE_SCORE.BEST]: "명작이에요🤩",
};
