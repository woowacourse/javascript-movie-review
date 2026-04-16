import { RatingScore } from "./validateScore";

export interface MovieRatingRepo {
  getRating(movieId: number): Promise<RatingScore | null>;

  saveRating(movieId: number, score: RatingScore): Promise<void>;
}
