import { MovieDetailProps } from '../../types/movie';
import renderModalContainer, { initializeModalContent } from './render';
import renderModalContent from './renderModalContent';
import { closeButtonClickHandler, closeModalHandler, propagationContainer } from './eventHandler';
import { scoreStarRateHandler } from './modalContentEventHandler';

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

  closeModalHandler();
  propagationContainer();
  closeButtonClickHandler();
  scoreStarRateHandler();
}

export default Modal;
