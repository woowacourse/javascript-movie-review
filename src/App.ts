import { initTemplate } from './initTemplate.ts';
import { initSearchSubmit, initLoadMore, initMovieClick, initModalClose } from './eventListeners.ts';
import { loadPopular, search, loadMore } from './presentation/MovieController.ts';
import { openModal, closeModal } from './presentation/ModalController.ts';

class App {
  constructor() {
    initTemplate();
    initSearchSubmit(search);
    initLoadMore(loadMore);
    initMovieClick(openModal);
    initModalClose(closeModal);
    loadPopular();
  }
}

new App();
