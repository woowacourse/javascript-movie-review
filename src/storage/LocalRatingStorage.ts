import { RatingStorage } from "./RatingStorage";

export class LocalRatingStorage implements RatingStorage {
  private readonly KEY = "movieRatings";

  getRating(movieId: number): number {
    const ratings = JSON.parse(localStorage.getItem(this.KEY) || "{}");
    return ratings[movieId] || 0;
  }

  setRating(movieId: number, score: number): void {
    const ratings = JSON.parse(localStorage.getItem(this.KEY) || "{}");
    ratings[movieId] = score;
    localStorage.setItem(this.KEY, JSON.stringify(ratings));
  }
}
