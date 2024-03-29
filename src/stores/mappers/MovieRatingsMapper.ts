import MovieRating, { MovieRatingProps } from "../../domain/MovieRating";
import MovieRatings from "../../domain/MovieRatings";
import { StoreMapper } from "./StoreMapper";

export default class MovieRatingsMapper implements StoreMapper<MovieRatings> {
  public fromJSON(json: any): MovieRatings {
    if (json && !this.isValidData(json)) {
      throw new Error("영화 평가 목록 데이터가 올바르지 않습니다.");
    }

    if (!json) {
      return new MovieRatings();
    }

    return new MovieRatings(
      json.map((props: MovieRatingProps) => new MovieRating(props))
    );
  }

  public toJSON(target: MovieRatings): MovieRatingProps[] {
    return target.info();
  }

  private isValidData(json: any): json is MovieRatingProps[] {
    return Array.isArray(json) && json.every(this.isMovieRatingProps);
  }

  private isMovieRatingProps(props: any): props is MovieRatingProps {
    const { movieId, rating } = props;

    return typeof movieId === "number" && typeof rating === "number";
  }
}
