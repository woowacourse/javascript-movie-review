import UserRating from './UserRating';
import UserRatingButtonList from './UserRatingButtonList';
import Modal from '../common/Modal';

import { posterNotFoundImage, starFilledImage } from '../../assets/images';
import { IMAGE_URL } from '../../constants';
import ratedMovieStates from '../../states/ratedMovies';
import { $ } from '../../utils/dom';

import type { MovieDetail } from '../MovieCardSection/MovieCard';

import './MovieDetailModal.style.css';

const MovieDetailModal = {
  template(movieDetail: MovieDetail) {
    return `
      <div class="modal-header">
        <h2>${movieDetail.title}</h2>
        <button type="button" class="modal-close-button">X</button>
      </div>
      <div class="movie-details">
        <div class="movie-detail-poster">
          <img
            src="${MovieDetailModal.handlePosterImage(movieDetail.posterPath)}"
            alt=${movieDetail.title}
          />
        </div>
        <div class="movie-detail-content">
          <div class="movie-detail-info">
            <div class="movie-detail-genre">
              <p>${movieDetail.genres.join(', ')}</p>
              <div class="movie-detail-score">
                <img src=${starFilledImage} alt="별점" />
              </div>
              <p>${movieDetail.rating.toFixed(1)}</p>
            </div>
            <p class="movie-detail-desc">
              ${movieDetail.overview ?? '현재 제공된 줄거리가 없습니다.'}
            </p>
          </div>
          ${UserRating.template(ratedMovieStates.find(movieDetail.id))}
        </div>
      </div>
    `;
  },

  setEvent() {
    const modalCloseButton = $<HTMLButtonElement>('.modal-close-button');

    modalCloseButton.addEventListener('click', Modal.close);
    UserRatingButtonList.setEvent();
  },

  open(movieDetail: MovieDetail) {
    Modal.open(MovieDetailModal.template(movieDetail));

    const modalContent = $<HTMLDivElement>('.modal-content');
    modalContent.dataset.movieId = movieDetail.id.toString();
    MovieDetailModal.setEvent();
  },

  handlePosterImage(path: string | null) {
    return path === null ? posterNotFoundImage : IMAGE_URL + path;
  },
};

export default MovieDetailModal;
