import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import MovieScoreBoard from '../MovieScoreBoard/MovieScoreBoard';

import type { MovieDetailInterface, RateDetail } from '../../../domain/Movie/MovieDetail/MovieDetail.type';

import { on } from '../../../utils/dom/eventListener/eventListener';
import { querySelector } from '../../../utils/dom/selector';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { FilledStar } from '../../../assets';

import './MovieReviewDetailModal.css';

type MovieReviewDetailModalProps = MovieDetailInterface & Pick<RateDetail, 'ratingScore'>;

class MovieReviewDetailModal extends Component<MovieReviewDetailModalProps> {
  private modal: Modal | undefined;

  protected render(): void {
    this.modal = new Modal(this.$element, {
      id: 'movie-review-detail-modal',
      class: 'movie-review-detail-modal',
      children: this.createComponent(),
    });

    const $section = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.modalReviewDetailSection, this.$element);

    new MovieScoreBoard($section, {
      ratingScore: this.props?.ratingScore,
      title: this.props?.title ?? '',
      id: this.props?.id ?? 0,
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
        <img 
          id="movie-description-image" 
          class="movie-description-image"
          src="${this.props?.image ? `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.image}` : ''}"
          onerror="
            this.style.border='1px solid #e2e2e2';
            this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
          "
        />
        <section id="modal-review-detail-section" class="modal-review-detail-section">
          <div class="movie-description-container text-body">
            <p class="movie-description-title"><span id="movie-genre" class="movie-genre">${
              this.props?.genres || '장르 없음'
            }</span> <img class="movie-title-image" src="${FilledStar}" /> <span id="movie-score" class="movie-score">${
      this.props?.score
    }</span></p>
            <p id="movie-description-body" class="movie-description-body">${
              this.props?.overview || '설명이 존재하지 않습니다.'
            }</p>
          </div>
        </section>
      </article>
    `.trim();
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
