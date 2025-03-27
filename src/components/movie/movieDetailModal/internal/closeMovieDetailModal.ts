import { $ } from "../../../utils/selectors";

export const closeMovieDetailModal = () => {
  const $movieDetailModal = $("#movie-detail-modal");

  if (
    !$movieDetailModal ||
    $movieDetailModal instanceof HTMLDialogElement === false
  ) {
    return;
  }

  $movieDetailModal.close();
};

export const addCloseEventOnModalBackground = () => {
  const $movieDetailModal = $("#movie-detail-modal");

  const closeModal = (event: Event): void => {
    if (event.target === $movieDetailModal) {
      closeMovieDetailModal();
    }
  };

  if (
    !$movieDetailModal ||
    $movieDetailModal instanceof HTMLDialogElement === false
  ) {
    return;
  }

  $movieDetailModal.addEventListener("click", closeModal);
};
