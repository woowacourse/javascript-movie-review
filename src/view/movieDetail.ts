import { RATING_SCORES, RATING_TEXTS } from "../constants/rating";
import { MovieDetail } from "../services/dto";
import { getLocalStorage } from "../services/storage";

export const renderMovieDetail = (movieDetail: MovieDetail) => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;

  movieModal.dataset.movieId = String(movieDetail.id);

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");
  const title = movieModal.querySelector("h2");
  const category = movieModal.querySelector(".category");
  const rate = movieModal.querySelector(".rate-value");
  const detail = movieModal.querySelector(".detail");

  if (modalImage) {
    modalImage.src =
      `https://media.themoviedb.org/t/p/w300_and_h450_face` +
      movieDetail.poster_path;
  }

  if (category) {
    const releaseYear = new Date(movieDetail.release_date).getFullYear();
    const genres = movieDetail.genres.map((genre) => genre.name).join(", ");
    category.textContent = `${releaseYear} · ${genres}`;
  }

  if (title) title.textContent = movieDetail.title;
  if (rate) rate.textContent = movieDetail.vote_average.toString();
  if (detail) detail.textContent = movieDetail.overview;

  const ratingScore = getLocalStorage(String(movieDetail.id));
  if (!ratingScore) return;

  const index = RATING_SCORES.indexOf(ratingScore);
  fillStars(index);
  updateRatingResult(index);
};

export const clearMovieDetail = () => {
  const movieModal = document.querySelector(".modal");
  if (!movieModal) return;

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");

  if (modalImage) modalImage.src = "";

  const stars = movieModal.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star) => (star.src = "./images/star_empty.png"));

  const ratingText = movieModal.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = "평가해주세요";

  const ratingValue = movieModal.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = "0";
};

export const fillStars = (index: number) => {
  const stars = document.querySelectorAll<HTMLImageElement>(".stars img");

  stars.forEach((currentStar, currentIndex) => {
    currentStar.src =
      currentIndex <= index
        ? "./images/star_filled.png"
        : "./images/star_empty.png";
  });
};

export const updateRatingResult = (index: number) => {
  const ratingText = document.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = RATING_TEXTS[index];

  const ratingValue = document.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = RATING_SCORES[index];
};
