export type ClickedRatingValueType = 0 | 2 | 4 | 6 | 8 | 10;

export interface RatingType {
  id: number;
  ratingValue: ClickedRatingValueType;
}

export type RatingListType = RatingType[];
