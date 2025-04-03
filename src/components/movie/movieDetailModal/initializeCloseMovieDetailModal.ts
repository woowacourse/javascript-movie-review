import {
  addCloseEventOnModalBackground,
  addCloseEventOnModalButton,
} from "./internal/closeMovieDetailModal";

const initializeCloseMovieDetailModal = () => {
  addCloseEventOnModalBackground();
  addCloseEventOnModalButton();
};

export default initializeCloseMovieDetailModal;
