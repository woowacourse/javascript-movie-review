import { MovieDetail } from "../services/dto";
import { resetRatingView, restoreRatingView } from "./rating";

interface MovieDetailViewData {
  imageSrc: string;
  title: string;
  category: string;
  rate: string;
  detail: string;
}

export const renderMovieDetail = (movieDetail: MovieDetail) => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;
  movieModal.dataset.movieId = String(movieDetail.id);

  const releaseYear = new Date(movieDetail.release_date).getFullYear();
  const genres = movieDetail.genres.map((genre) => genre.name).join(", ");

  updateMovieDetailContent(movieModal, {
    imageSrc: `https://media.themoviedb.org/t/p/w300_and_h450_face${movieDetail.poster_path}`,
    title: movieDetail.title,
    category: `${releaseYear} · ${genres}`,
    rate: movieDetail.vote_average.toString(),
    detail: movieDetail.overview,
  });

  restoreRatingView(String(movieDetail.id));
};

export const clearMovieDetail = () => {
  const movieModal = document.querySelector<HTMLElement>(".modal");
  if (!movieModal) return;

  updateMovieDetailContent(movieModal, {
    imageSrc: "",
    title: "",
    category: "",
    rate: "",
    detail: "",
  });

  resetRatingView(movieModal);
};

const getMovieDetailElements = (movieModal: HTMLElement) => {
  const modalImage =
    movieModal.querySelector<HTMLImageElement>(".modal-image img");
  const title = movieModal.querySelector("h2");
  const category = movieModal.querySelector(".category");
  const rate = movieModal.querySelector(".rate-value");
  const detail = movieModal.querySelector(".detail");

  return { modalImage, title, category, rate, detail };
};

const updateMovieDetailContent = (
  movieModal: HTMLElement,
  viewData: MovieDetailViewData,
) => {
  const { modalImage, title, category, rate, detail } =
    getMovieDetailElements(movieModal);

  if (modalImage) modalImage.src = viewData.imageSrc;
  if (title) title.textContent = viewData.title;
  if (category) category.textContent = viewData.category;
  if (rate) rate.textContent = viewData.rate;
  if (detail) detail.textContent = viewData.detail;
};
