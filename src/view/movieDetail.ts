import { MovieDetail } from "../services/dto";

export const renderMovieDetail = (movieDetail: MovieDetail) => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return null;

  movieModal.dataset.movieId = String(movieDetail.id);

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");
  const title = movieModal.querySelector("h2");
  const category = movieModal.querySelector(".category");
  const rate = movieModal.querySelector(".rate-value");
  const detail = movieModal.querySelector(".detail");

  if (modalImage)
    modalImage.src =
      `https://media.themoviedb.org/t/p/w300_and_h450_face` +
      movieDetail.poster_path;

  if (title) title.textContent = movieDetail.title;

  if (category) {
    const releaseYear = new Date(movieDetail.release_date).getFullYear();
    const genres = movieDetail.genres.map((genre) => genre.name).join(", ");
    category.textContent = `${releaseYear} · ${genres}`;
  }

  if (rate) rate.textContent = movieDetail.vote_average.toString();

  if (detail) detail.textContent = movieDetail.overview;

  const key = window.localStorage.getItem(String(movieDetail.id));
  if (!key) return;

  const stars = movieModal.querySelectorAll<HTMLImageElement>(".stars img");
  stars[Number(key) / 2 - 1].click();
};

export const clearMovieDetail = () => {
  const movieModal = document.querySelector(".modal");
  if (!movieModal) return;

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");

  if (modalImage) modalImage.src = "";

  const stars = movieModal.querySelectorAll<HTMLImageElement>(".stars img");
  stars.forEach((star) => (star.src = "./images/star_empty.png"));

  const ratingText = document.querySelector(".rating-text");
  if (ratingText) ratingText.textContent = "평가해주세요";

  const ratingValue = document.querySelector("#rating-value");
  if (ratingValue) ratingValue.textContent = (0).toString();
};
