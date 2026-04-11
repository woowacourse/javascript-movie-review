import { localStarApi as starApi} from "../api/localStarApi";

class CurrentMovieModel {
  #currentMovieId: number | null = null;

  get currentMovieId() {
    return this.#currentMovieId;
  };

  set currentMovieId(movieId) {
    this.#currentMovieId = movieId;
  };

  async saveRating(score: number) {
    if (this.#currentMovieId) {
      await starApi.saveRating(this.#currentMovieId, score);
    };
  };

  async getRating() {
    if (this.#currentMovieId) {
      return await starApi.getRating(this.#currentMovieId);
    };
    return 0;
  };
}

export const currentMovieModel = new CurrentMovieModel();
