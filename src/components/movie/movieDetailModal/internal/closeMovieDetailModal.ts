import { $ } from "../../../utils/selectors";

const closeMovieDetailModal = () => {
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

export const addCloseEventOnModalButton = () => {
  const $closeMovieDetailModalButton = $("#closeModal");

  if ($closeMovieDetailModalButton) {
    $closeMovieDetailModalButton.addEventListener(
      "click",
      closeMovieDetailModal
    );
  }
};
