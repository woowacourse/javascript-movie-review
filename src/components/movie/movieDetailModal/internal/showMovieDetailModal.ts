import { $ } from "../../../utils/selectors";

const showMovieDetailModal = () => {
  const $movieDetailModal = $("#movie-detail-modal");
  if (
    !$movieDetailModal ||
    $movieDetailModal instanceof HTMLDialogElement === false
  ) {
    return;
  }

  $movieDetailModal.showModal();
};

export default showMovieDetailModal;
