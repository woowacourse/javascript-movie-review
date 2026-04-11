class CurrentMovieModel {
  #currentMovieId: number | null = null;

  get currentMovieId() {
    return this.#currentMovieId;
  };

  set currentMovieId(movieId) {
    this.#currentMovieId = movieId;
  };

  saveRating(score: number) {
    window.localStorage.setItem(`${this.#currentMovieId}`, `${score}`);
  };

  getRating() {
    if (this.#currentMovieId) {
      const movieRatingScore = window.localStorage.getItem(`${this.#currentMovieId}`);
      if (!movieRatingScore) {
        return 0;
      };
      return Number(movieRatingScore);
    };
  };
}

export const currentMovieModel = new CurrentMovieModel();
