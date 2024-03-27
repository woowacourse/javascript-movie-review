import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import MovieScoreBoard from '../MovieScoreBoard/MovieScoreBoard';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';

import type { MovieDetailInterface, RateDetail } from '../../../domain/MovieDetail/MovieDetail.type';

import { querySelector } from '../../../utils/dom/selector';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { FilledStar } from '../../../assets';

import './MovieReviewDetailModal.css';

type MovieReviewDetailModalProps = MovieDetailInterface & Pick<RateDetail, 'ratingScore'>;

class MovieReviewDetailModal extends Component<MovieReviewDetailModalProps> {
  protected render(): void {
    new Modal(this.$element, {
      id: 'movie-review-detail-modal',
      class: 'movie-review-detail-modal',
      children: this.createComponent(),
    });

    const $nav = querySelector<HTMLElement>(ELEMENT_SELECTOR.modalReviewDetailHeader, this.$element);

    new ModalCloseButton($nav);

    const $section = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.modalReviewDetailSection, this.$element);

    new MovieScoreBoard($section, {
      ratingScore: this.props?.ratingScore,
      title: this.props?.title ?? '',
      id: this.props?.id ?? 0,
    });
  }

  protected createComponent() {
    return /* html */ `
      <nav id="modal-review-detail-header" class="modal-review-detail-header">
        <span id="modal-review-detail-title">${this.props?.title}</span>
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
    `;
  }

  open() {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal, this.$element);

    $modal.showModal();
  }
}

export default MovieReviewDetailModal;
