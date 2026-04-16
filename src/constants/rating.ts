export const RATING_TEXTS = [
  "최악이에요",
  "별로에요",
  "보통이에요",
  "재밌어요",
  "명작이에요",
] as const;

export const RATING_SCORES = ["2", "4", "6", "8", "10"] as const;

export type RatingScore = (typeof RATING_SCORES)[number];

export const isRatingScore = (value: string | null): value is RatingScore => {
  return value !== null && RATING_SCORES.includes(value as RatingScore);
};
