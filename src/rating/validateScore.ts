export const VALID_SCORES = [0, 2, 4, 6, 8, 10] as const;
export type RatingScore = (typeof VALID_SCORES)[number];

export const isValidScore = (score: number): score is RatingScore =>
  (VALID_SCORES as readonly number[]).includes(score);
