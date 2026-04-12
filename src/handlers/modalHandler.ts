import { loadMovieDetail } from "../movieLoader";
import { clearMovieDetail } from "../view/movieDetail";
import { closeMovieModal, openMovieModal } from "../view/movieModal";

export const handleMovieItemClick = async (e: Event) => {
  const target = e.target as HTMLElement;
  const movieItem = target.closest("li");
  if (!movieItem) return;

  const movieId = movieItem.dataset.movieId;
  if (!movieId) return;

  loadMovieDetail(movieId);
  openMovieModal();
};

export const handleModalCloseButtonClick = () => {
  clearMovieDetail();
  closeMovieModal();
};

export const handleModalEscapeKeydown = handleModalCloseButtonClick;

export const handleModalBackdropClick = handleModalCloseButtonClick;
