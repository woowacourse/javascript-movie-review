import { $ } from "../../utils/selectors";
import {
  addCloseEventOnModalBackground,
  closeMovieDetailModal,
} from "./internal/closeMovieDetailModal";

const initializeCloseMovieDetailModal = () => {
  addCloseEventOnModalBackground();

  const $closeMovieDetailModalButton = $("#closeModal");

  if ($closeMovieDetailModalButton) {
    $closeMovieDetailModalButton.addEventListener(
      "click",
      closeMovieDetailModal
    );
  }
};

export default initializeCloseMovieDetailModal;
