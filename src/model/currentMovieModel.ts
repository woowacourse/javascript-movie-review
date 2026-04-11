class CurrentMovieModal {
  #currentMovieId: number | null = null;

  get currentMovieId() {
    return this.#currentMovieId;
  };

  set currentMovieId(movieId) {
    this.#currentMovieId = movieId;
  };
}

export const currentMovieModal = new CurrentMovieModal();
