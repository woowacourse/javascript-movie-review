import CustomModal from './common/CustomModal';
import DefaultPoster from '../../images/default_poster.png';

import { MODAL_CLOSE_ICON, STAR_EMPTY_ICON_LARGE, STAR_FILLED_ICON } from '../icons';

import { $ } from '../utils/domUtils';

import { MovieDetailResponse } from '../domain/remotes/movieDetail';
import { MODAL_SKELETON_TEMPLATE } from '../constants';

class MovieDetailModal extends HTMLElement {
  render(movieDetail: MovieDetailResponse) {
    const { title, genres, overview, poster_path, vote_average } = movieDetail;

    this.innerHTML = /* html */ `
      <header class="modal-header">
        <h3 class="modal-title">${title}</h3>
        <button class="modal-close-button">${MODAL_CLOSE_ICON}</button>
      </header>
      <div class="detail-container">
        <figure class="modal-thumbnail-wrapper">
          <img
          class="modal-thumbnail skeleton"
          src=${
            poster_path === 'null'
              ? DefaultPoster
              : `https://image.tmdb.org/t/p/w220_and_h330_face${poster_path}`
          }
          loading="lazy"
          alt="${title}"
          />
        </figure>
        <section class="movie-detail">
          <div class="flex align-center">
            <p>${genres.map((genre) => genre.name).join(', ')}</p>
            <p class="vote-average">${STAR_FILLED_ICON} ${vote_average}</p>
          </div>
          <p class="overview">${overview === '' ? '등록된 줄거리가 없습니다.' : overview}</p>
          <section class="vote">
            <p class="my-vote">내 별점</p>
            <div class="icon-container">
              ${STAR_EMPTY_ICON_LARGE.repeat(5)}
            </div>
          </section>
        </section>
      </div>
    `;

    this.bindEvents();
  }

  bindEvents() {
    $('.modal-close-button')?.addEventListener('click', () => this.handleCloseButtonClick());
  }

  showSkeleton() {
    this.innerHTML = MODAL_SKELETON_TEMPLATE;
  }

  handleCloseButtonClick() {
    const $customModal = $('custom-modal') as CustomModal;
    $customModal.closeModal();
  }
}

export default MovieDetailModal;