import { fetchMovieDetail } from "../api/fetchMovieDetail";
import MovieDetailView from "../View/MovieDetailView";
import RatingView from "../View/RatingView";

class MovieDetailModalController {
  #movieDetailView;
  #ratingView;

  constructor(movieDetailView: MovieDetailView, ratingView: RatingView) {
    this.#movieDetailView = movieDetailView;
    this.#ratingView = ratingView;
  }

  async showMovieInformation(movieId: number) {
    try {
      await this.#loadMovieDetail(movieId);
      this.#loadRatingValue();
      this.#movieDetailView.show();
    } catch (error) {
      alert((error as Error).message);
    }
  }

  setRatingValue(ratingValue: number) {
    const movieId = this.#movieDetailView.getMovieId();
    localStorage.setItem(`rating-${movieId}`, ratingValue.toString());
    this.#ratingView.renderByRatingValue(ratingValue);
  }

  async #loadMovieDetail(movieId: number) {
    const movieDetail = { ...(await fetchMovieDetail(movieId)) };
    this.#movieDetailView.renderData(movieDetail);
  }

  #loadRatingValue() {
    const movieId = this.#movieDetailView.getMovieId();
    const ratingValue = Number(localStorage.getItem(`rating-${movieId}`));
    this.#ratingView.renderByRatingValue(ratingValue);
  }
}

export default MovieDetailModalController;
