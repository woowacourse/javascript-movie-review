import './style.css';
import { DETAIL_MODAL_TEMPLATE } from '../../constants/templates';
import { MovieDetailType } from '../../types/movie';
import httpRequest from '../../api/httpRequest';
import filterMovieDetail from '../../domain/filterMovieDetail';
import HTTPError from '../../api/HttpError';
import errorMessage from '../../error/errorMessage';
import { STAR_EMPTY, STAR_FILLED } from '../../images';
import { RATING_MESSAGE } from '../../constants/rating';
import rating from '../../domain/rating';

const movieDetailModal = {
  createModal() {
    const dialog = document.createElement('dialog');
    return dialog;
  },

  insertTemplate(movie: MovieDetailType | null) {
    const dialog = document.querySelector('dialog');
    if (movie === null) return;
    const ratingValue = this.getLocalRatingValue(movie.id);

    if (dialog) dialog.innerHTML = DETAIL_MODAL_TEMPLATE(movie, ratingValue);
    this.setModalCloseEvent();
    this.handleRating();
  },

  handleDetailModal(ul: HTMLElement) {
    const dialog = document.querySelector('dialog');

    if (dialog && ul) {
      ul.addEventListener('click', (event: Event) => {
        const target = event.target as HTMLDivElement;
        if (target && target.className === 'item-list') return;

        const movieId = Number(target?.closest('a')?.getAttribute('data-id')) ?? 0;
        this.getMovieDetail(movieId).then((movie: MovieDetailType | null) => {
          if (movie !== null) movieDetailModal.insertTemplate(movie);
        });
        dialog.showModal();
      });
    }
  },

  async getMovieDetail(movieId: number): Promise<MovieDetailType | null> {
    try {
      const movieDetail = await httpRequest.fetchMovieDetail(movieId);
      const filteredMovieDetail = filterMovieDetail(movieDetail);
      return filteredMovieDetail;
    } catch (error) {
      const customError = error as HTTPError;
      errorMessage.apiError(customError.statusCode, customError.message ?? '');
      return null;
    }
  },

  setModalCloseEvent() {
    const closeButton = document.querySelector('#detail-modal--close-btn');
    const dialog = document.querySelector('dialog');
    if (closeButton && dialog) {
      closeButton.addEventListener('click', () => dialog.close());
    }
  },

  handleRating() {
    const rating = document.querySelector('#detail-modal--rating');
    if (rating) {
      rating.addEventListener('click', (event: Event) => {
        // 사용자가 클릭한 별점의 인덱스 찾는다
        const target = event.target as HTMLElement;
        if (target && target.className !== 'rating-star') return;
        const idAttribute = target.getAttribute('data-id');
        if (!idAttribute) return;
        const id = Number(idAttribute);

        // localStorage를 업데이트 한다

        // 클릭한 위치까지의 별점을 색칠한다
        const ratingStarList = rating.querySelectorAll('.rating-star');
        ratingStarList.forEach((star, index) => {
          if ((index + 1) * 2 <= id) {
            star.setAttribute('src', STAR_FILLED);
          } else {
            star.setAttribute('src', STAR_EMPTY);
          }
        });

        // rating-value를 바꾼다
        const ratingValue = rating.querySelector('#detail-modal--rating-value');
        if (!ratingValue) return;
        ratingValue.innerHTML = String(id);

        // rating-label을 바꾼다
        const ratingLabel = rating.querySelector('#detail-modal--rating-label');
        if (!ratingLabel) return;
        ratingLabel.innerHTML = RATING_MESSAGE[id];
      });
    }
  },

  getLocalRatingValue(id: number): number {
    const { ratingValue } = rating.getLocalDataItem(id);
    return ratingValue;
  },
};

export default movieDetailModal;
