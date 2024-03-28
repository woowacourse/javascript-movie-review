import { MovieDetailProps } from '../../types/movie';
import renderModalContainer, { initializeModalContent } from './render';
import renderModalContent from './renderModalContent';
import { closeButtonClickHandler, closeModalHandler, propagationContainer, openModalHandler } from './eventHandler';
import { scoreStarRateHandler } from './modalContentEventHandler';

function attachEventHandlers() {
  openModalHandler();
  closeModalHandler();
  propagationContainer();
  closeButtonClickHandler();
  scoreStarRateHandler();
}

/* eslint-disable max-lines-per-function */
function Modal({ title, genres, vote_average, poster_path, overview, star_rating }: MovieDetailProps) {
  initializeModalContent();
  renderModalContainer();
  renderModalContent({
    title,
    genres,
    vote_average,
    poster_path,
    overview,
    star_rating,
  });
  attachEventHandlers();
}

export default Modal;
