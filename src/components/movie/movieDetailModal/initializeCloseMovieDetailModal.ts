import { $ } from "../../utils/selectors";
import {
  addCloseEventOnModalBackground,
  closeMovieDetailModal,
} from "./internal/closeMovieDetailModal";
import showMovieDetailModal from "./internal/showMovieDetailModal";

const initializeCloseMovieDetailModal = () => {
  addCloseEventOnModalBackground();

  const $closeMovieDetailModalButton = $("#closeModal");

  if ($closeMovieDetailModalButton) {
    $closeMovieDetailModalButton.addEventListener(
      "click",
      closeMovieDetailModal
    );
  }

  const $openMovieDetailModalButton = $("#movie-detail-button");

  if ($openMovieDetailModalButton) {
    $openMovieDetailModalButton.addEventListener("click", showMovieDetailModal);
  }
};

export default initializeCloseMovieDetailModal;
