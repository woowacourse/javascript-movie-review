import { MovieDetail } from "../services/dto";

export function renderMovieDetail(movieDetail: MovieDetail) {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return null;

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");
  const title = movieModal.querySelector("h2");
  const rate = movieModal.querySelector(".rate-value");
  const detail = movieModal.querySelector(".detail");
  const category = movieModal.querySelector(".category");

  if (modalImage)
    modalImage.src =
      `https://media.themoviedb.org/t/p/w300_and_h450_face` +
      movieDetail.poster_path;

  if (title) title.textContent = movieDetail.title;

  if (rate) rate.textContent = movieDetail.vote_average.toString();

  if (detail) detail.textContent = movieDetail.overview;

  if (category) {
    const releaseYear = new Date(movieDetail.release_date).getFullYear();
    const genres = movieDetail.genres.map((genre) => genre.name).join(", ");
    category.textContent = `${releaseYear} · ${genres}`;
  }
}

export function clearMovieDetail() {
  const movieModal = document.querySelector("#modal-background");
  if (!movieModal) return;

  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");

  if (modalImage) modalImage.src = "";
}
