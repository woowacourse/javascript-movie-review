import RatingBar from './RatingBar';
import { StorageMovieType } from '../types';
import { IMAGE_URL } from '../constants';
import { $, $$ } from '../utils/domSelector';

type MovieInfoModalType = {
  parentElement: HTMLElement;
  onRatingRequestEvent: CallableFunction;
};

class MovieInfoModal {
  private onRatingRequestEvent;
  private $modal;

  constructor({ parentElement, onRatingRequestEvent }: MovieInfoModalType) {
    this.$modal = document.createElement('div');
    this.$modal.classList.add('information-modal-wrapper');
    this.$modal.setAttribute('hidden', '');

    parentElement.appendChild(this.$modal);
    this.setCloseListeners();
    this.setBrowserBackListeners();
    this.onRatingRequestEvent = onRatingRequestEvent;
  }

  openInfoModalWithInfo(movieInfo: StorageMovieType) {
    this.$modal.innerHTML = this.getTemplate(movieInfo);
    this.renderRatingBar(movieInfo.id);
    this.$modal.removeAttribute('hidden');

    history.pushState({ isModalOpen: true }, '');
  }

  private getUserMovieRating(rating: number) {
    return this.onRatingRequestEvent(rating);
  }

  closeInfoModal() {
    this.$modal.setAttribute('hidden', '');

    if (history.state && history.state.isModalOpen) {
      history.back();
    }
  }

  private closeInfoModalWithoutHistoryBack() {
    this.$modal.setAttribute('hidden', '');
  }

  private setCloseListeners() {
    this.$modal.addEventListener('click', (event) => {
      if (!(event.target instanceof HTMLElement)) return;

      const closest = event.target.closest('.information-modal-backdrop, .modal-close-button');

      if (closest) {
        this.closeInfoModal();
      }
    });

    document.addEventListener('keydown', (event) => {
      if (['Escape', 'Backspace'].includes(event.key)) {
        this.closeInfoModal();
      }
    });
  }

  private setBrowserBackListeners() {
    window.onpopstate = () => {
      if (!this.$modal.hasAttribute('hidden')) {
        this.closeInfoModalWithoutHistoryBack();
      }
    };
  }

  private renderRatingBar(id: number) {
    const rating = this.getUserMovieRating(id);

    new RatingBar({
      parentElement: $('.information-modal-my-rating'),
      id: id,
      startRating: rating,
      ratingInfos: [
        { rating: 2, alias: '최악이에요' },
        { rating: 4, alias: '별로에요' },
        { rating: 6, alias: '보통이에요' },
        { rating: 8, alias: '재밌어요' },
        { rating: 10, alias: '명작이에요' },
      ],
    });
  }

  private getTemplate({
    title,
    posterPath,
    convertedGenres,
    voteAverage,
    overview,
  }: StorageMovieType) {
    return `
      <div class="information-modal-backdrop"></div>
        <div class="information-modal">
          <button class="modal-close-button"> 
            <span class="close-icon-stick"></span>
            <span class="close-icon-stick"></span>
          </button>
          <div class="information-modal-title">${title}</div>
          <div class="information-modal-poster">
            <img
              class="modal-image"
              src="${IMAGE_URL(posterPath)}" />
          </div>
        <div class="information-modal-genre-rating">
          <div class="modal-text">${this.getArrangedGenres(convertedGenres)}</div>
          <img src="../assets/rating_star_filled.png" />
          <div class="modal-text">${voteAverage}</div>
        </div>
        <div class="information-modal-content"
          >${this.getOverview(overview)}</div
        >
        <div class="information-modal-my-rating"></div>
      </div>`;
  }

  private getArrangedGenres(genres: string[]) {
    return genres.length > 0
      ? genres.join(', ')
      : '<span class="modal-text no-data">장르 정보 없음</span>';
  }

  private getOverview(overview: string) {
    return overview.trim() === ''
      ? '<span class="modal-text no-data">이 영화는 별도의 영화에 대한 설명이 없네요!</span>'
      : overview;
  }
}

export default MovieInfoModal;
