import { MovieDetailProps } from '../../types/movie';
import renderModalContainer, { initializeModalContent } from './render';
import renderModalContent from './renderModalContent';
import { onCloseButtonClick, onCloseModal, onPropagationContainer, onOpenModal } from './eventHandler';
import { onScoreStarRate } from './modalContentEventHandler';

function attachEventHandlers() {
  onOpenModal();
  onCloseModal();
  onPropagationContainer();
  onCloseButtonClick();
  onScoreStarRate();
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
