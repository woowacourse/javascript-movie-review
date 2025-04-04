export interface StarRating {
  id: string;
  score: Score;
}

export type Score = 0 | 2 | 4 | 6 | 8 | 10;
