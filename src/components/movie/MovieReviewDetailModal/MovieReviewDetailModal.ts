import { FilledStar } from '../../../assets';
import { ELEMENT_SELECTOR } from '../../../constants/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';
import { querySelector } from '../../../utils/dom/selector';
import Component from '../../common/Component/Component';

import Modal from '../../common/Modal/Modal';

import './MovieReviewDetailModal.css';

interface MovieReviewDetailModalProps {
  title: string;
  image: string;
  genre: string;
  overview: string;
  score: string;
}

class MovieReviewDetailModal extends Component<MovieReviewDetailModalProps> {
  private modal: Modal | undefined;

  protected render(): void {
    this.modal = new Modal(this.$element, {
      id: 'movie-review-detail-modal',
      class: 'movie-review-detail-modal',
      children: this.createComponent(),
    });
  }

  protected createComponent() {
    return /* html */ `
      <nav class="modal-review-detail-header">
        <span id="modal-review-detail-title">${this.props?.title}</span>
        <button id="modal-close-button" type="button" class="modal-close-button">
          <svg viewBox="0 0 40 40">
              <path class="modal-close-icon" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
          </svg>
        </button>
      </nav>
      <article class="modal-review-detail-content">
        <img id="movie-description-image" class="movie-description-image" src="${`${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.image}`}" alt="" />
        <section class="modal-review-detail-section">
          <div class="movie-description-container text-body">
            <p class="movie-description-title"><span id="movie-genre" class="movie-genre">${
              this.props?.genre
            }</span> <img class="movie-title-image" src="${FilledStar}" /> <span id="movie-score" class="movie-score">${
      this.props?.score
    }</span></p>
            <p id="movie-description-body" class="movie-description-body">${
              this.props?.overview || '설명이 존재하지 않습니다.'
            }</p>
          </div>
          <div class="movie-score-board text-body">
            <span class="movie-score-board-title">내 별점</span>
            <div class="movie-score-board-stars">
              <img src="${FilledStar}" />
              <img src="${FilledStar}" />
              <img src="${FilledStar}" />
              <img src="${FilledStar}" />
              <img src="${FilledStar}" />
            </div>
            <span>6</span>
            <span>보통이에요</span>
          </div>
        </section>
      </article>
    `;
  }

  open() {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal, this.$element);

    $modal.showModal();
  }

  protected setEvent(): void {
    const $modalCloseButton = querySelector<HTMLButtonElement>(ELEMENT_SELECTOR.modalCloseButton, this.$element);

    on({
      target: $modalCloseButton,
      eventName: 'click',
      eventHandler: this.handleModalCloseButton.bind(this),
    });
  }

  private handleModalCloseButton() {
    if (!this.modal) return;

    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal, this.$element);

    $modal.close();
  }
}

export default MovieReviewDetailModal;
