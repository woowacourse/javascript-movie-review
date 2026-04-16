export const MOVIE_USER_RATING_LABELS = {
  2: "최악이에요",
  4: "별로예요",
  6: "보통이에요",
  8: "재미있어요",
  10: "명작이에요",
} as const;

export type MovieUserRating = keyof typeof MOVIE_USER_RATING_LABELS;

export const MOVIE_USER_RATING_OPTIONS = Object.keys(MOVIE_USER_RATING_LABELS).map((key) =>
  Number(key),
) as MovieUserRating[];
