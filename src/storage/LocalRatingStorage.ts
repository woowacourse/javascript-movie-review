import { RatingStorage } from "./RatingStorage";

export class LocalRatingStorage implements RatingStorage {
  private readonly KEY = "movieRatings";

  getRating(movieId: number): number {
    try {
      const ratings = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      return ratings[movieId] || 0;
    } catch (error) {
      console.error("JSON 파싱에 실패하였습니다.");
      return 0;
    }
  }

  setRating(movieId: number, score: number): void {
    try {
      const ratings = JSON.parse(localStorage.getItem(this.KEY) || "{}");
      ratings[movieId] = score;
      localStorage.setItem(this.KEY, JSON.stringify(ratings));
    } catch (error) {
      console.error("별점 저장에 실패하였습니다.");
    }
  }
}
