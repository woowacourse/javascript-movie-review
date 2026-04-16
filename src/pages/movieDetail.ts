import { getMovieDetail } from "../api.ts";
import { MovieDetailRenderer } from "../render.ts";
import { StorageInterface } from "../storage.ts";

export const MovieDetail = {
  storage: null as unknown as StorageInterface,

  init(storage: StorageInterface) {
    this.storage = storage;
    this.setUpDialogCloser();
    this.setUpMyRatingToMovie();
  },

  setUpDialogCloser() {
    const dialog = document.querySelector("dialog");
    const dialogCloser = document.querySelector("#closeModal");
    dialogCloser?.addEventListener("click", () => {
      if (dialog) dialog.close();
    });
  },

  async loadMovieDetail(movieId: number) {
    const dialog = document.querySelector("dialog");
    dialog?.showModal();
    const movieData = await getMovieDetail(movieId);
    const rating = this.storage.getMyRating(`movie-${movieId}-my-rating`);
    MovieDetailRenderer.renderMovieDetail(
      movieData,
      new Date(movieData.release_date).getFullYear(),
      movieData.genres.map((genre) => genre.name),
      rating,
    );
  },

  setUpMovieDetail() {
    const movieList = [
      ...document.querySelectorAll(".thumbnail-list li"),
    ].filter((el) => !el.classList.contains("skeleton"));
    movieList.forEach((movie) => {
      movie.addEventListener("click", (e) => {
        e.preventDefault();
        const movieId = (movie as HTMLElement).dataset.movieId;
        if (!movieId) return;
        this.loadMovieDetail(Number(movieId));
      });
    });
  },

  setUpMyRatingToMovie() {
    const ratingButtons = document.querySelectorAll(
      ".modal .my-rating-container button",
    );
    ratingButtons.forEach((button) => {
      button.addEventListener("click", (e) => {
        e.preventDefault();
        const myRating = (e.currentTarget as HTMLElement).dataset.rating;
        const movieContainer = document.querySelector(
          "#movie-detail-container",
        );
        const movieId = (movieContainer as HTMLElement).dataset.movieId;
        this.storage.setMyRating(`movie-${movieId}-my-rating`, String(myRating));
        MovieDetailRenderer.renderMyRating(myRating ? Number(myRating) : 0);
      });
    });
  },
};
