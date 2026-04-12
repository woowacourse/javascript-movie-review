import { Movie } from "../api.ts";
import { MovieRenderer } from "../render.ts";
import State from "../state.ts";

export const MovieDetail = {
  setUpInitEventListeners() {
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

  setUpMovieDetail(moviesData: Movie[]) {
    // 이미 렌더링된 영화는 제외한다.
    const movieList = [
      ...document.querySelectorAll(".thumbnail-list li"),
    ].slice(-moviesData.length);
    movieList.forEach((movie, idx) => {
      movie.addEventListener("click", (e) => {
        e.preventDefault();
        const dialog = document.querySelector("dialog");
        const movieData = moviesData[idx];
        const [movieGenres, rating] = this.extractDetailMovieData(movieData);
        MovieRenderer.renderMovieDetail(
          movieData,
          new Date(movieData.release_date).getFullYear(),
          movieGenres,
          rating,
        );
        dialog?.showModal();
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
        this.setMyRating(`movie-${movieId}-my-rating`, String(myRating));
        MovieRenderer.renderMyRating(myRating ? Number(myRating) : 0);
      });
    });
  },

  extractDetailMovieData(movie: Movie): [string[], number] {
    const genres = State.getGenres();
    const movieGenres = movie.genre_ids.map(
      (genreId) => genres.find((genre) => genre.id === genreId)!.name,
    );
    const currentRating = this.getMyRating(`movie-${movie.id}-my-rating`);
    return [movieGenres, currentRating];
  },

  getMyRating(key: string) {
    return Number(localStorage.getItem(key));
  },

  setMyRating(key: string, rating: string) {
    localStorage.setItem(key, rating);
  },
};
