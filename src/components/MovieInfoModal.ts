import { StorageMovieType } from '../types';
import { IMAGE_URL } from '../constants';

class MovieInfoModal {
  private $modal: HTMLElement;

  constructor(parentElement: HTMLElement) {
    this.$modal = document.createElement('div');
    this.$modal.classList.add('information-modal-wrapper');
    this.$modal.setAttribute('hidden', '');

    parentElement.appendChild(this.$modal);
    this.setCloseListeners();
    this.setBrowserBackListeners();
  }

  openInfoModalWithInfo(movieInfo: StorageMovieType) {
    console.log(movieInfo);
    this.$modal.innerHTML = this.getTemplate(movieInfo);
    this.$modal.removeAttribute('hidden');

    history.pushState({ isModalOpen: true }, '');
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
          <div class="modal-text">${voteAverage}</div>
        </div>
        <div class="information-modal-content"
          >${this.getOverview(overview)}</div
        >
        <div class="information-modal-my-rating">
          <div class="user-rating-title">내 별점</div>
          <input class="user-rating-bar" type="range" min="2" max="10" step="2" />
          <div class="modal-text">6</div>
          <div class="modal-text">보통이에요</div>
        </div>
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
