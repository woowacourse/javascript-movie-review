import { initTemplate } from './initTemplate.ts';
import { initSearchSubmit, initLoadMore, initMovieClick, initModalClose, initRatingClick, initDetailClick } from './eventListeners.ts';
import { loadPopular, search, loadMore } from './presentation/MovieController.ts';
import { openModal, closeModal, rateMovie } from './presentation/ModalController.ts';

class App {
  constructor() {
    initTemplate();
    initDetailClick(openModal)
    initSearchSubmit(search);
    initLoadMore(loadMore);
    initMovieClick(openModal);
    initModalClose(closeModal);
    initRatingClick(rateMovie)
    loadPopular();
  }
}

new App();
