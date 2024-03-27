import './style.css';
import { DETAIL_MODAL_TEMPLATE } from '../../constants/templates';
import { MovieDetailType } from '../../types/movie';
import httpRequest from '../../api/httpRequest';
import filterMovieDetail from '../../domain/filterMovieDetail';
import HTTPError from '../../api/HttpError';
import errorMessage from '../../error/errorMessage';

const movieDetailModal = {
  createModal() {
    const dialog = document.createElement('dialog');
    return dialog;
  },

  insertTemplate(movie: MovieDetailType) {
    const dialog = document.querySelector('dialog');
    if (dialog) dialog.innerHTML = DETAIL_MODAL_TEMPLATE(movie);
    this.setModalCloseEvent();
  },

  handleDetailModal(ul: HTMLElement) {
    const dialog = document.querySelector('dialog');

    if (dialog && ul) {
      ul.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (target?.className === 'item-list') return;

        const movieId = Number(target?.closest('a')?.getAttribute('data-id')) ?? 0;
        this.getMovieDetail(movieId).then((movie) => {
          if (movie !== undefined) movieDetailModal.insertTemplate(movie);
        });
        dialog.showModal();
      });
    }
  },

  async getMovieDetail(movieId: number): Promise<MovieDetailType | undefined> {
    try {
      const movieDetail = await httpRequest.fetchMovieDetail(movieId);
      const filteredMovieDetail = filterMovieDetail(movieDetail);
      return filteredMovieDetail;
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ?? '');
    }
  },

  setModalCloseEvent() {
    const closeButton = document.querySelector('#detail-modal--close-btn');
    const dialog = document.querySelector('dialog');
    if (closeButton && dialog) {
      closeButton.addEventListener('click', () => dialog.close());
    }
  },
};

export default movieDetailModal;
