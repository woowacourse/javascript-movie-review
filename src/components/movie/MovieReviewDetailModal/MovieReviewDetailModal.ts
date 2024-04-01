import Component from '../../common/Component/Component';
import Modal from '../../common/Modal/Modal';
import MovieScoreBoard from '../MovieScoreBoard/MovieScoreBoard';
import ModalCloseButton from '../ModalCloseButton/ModalCloseButton';
import ErrorFallbackModal from '../ErrorFallbackModal/ErrorFallbackModal';

import MovieDetail from '../../../domain/MovieDetail/MovieDetail';
import type { MovieDetailInterface, RateDetail } from '../../../domain/MovieDetail/MovieDetail.type';

import { querySelector } from '../../../utils/dom/selector';

import { ELEMENT_SELECTOR } from '../../../constants/selector';
import { DEFAULT_IMAGE_URL } from '../../../constants/movie';

import { FilledStar } from '../../../assets';

import './MovieReviewDetailModal.css';

type MovieReviewDetailModalProps = MovieDetailInterface & Pick<RateDetail, 'ratingScore'>;

class MovieReviewDetailModal extends Component<MovieReviewDetailModalProps> {
  static async rerender(movieId: number) {
    try {
      const { id, overview, title, score, image, genres, ratingScore } = await MovieDetail.fetchMovieDetail(
        String(movieId),
      );

      const movieDetail = { id, overview, title, score, image, genres, ratingScore };

      const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal);
      const $app = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.app);

      $modal.remove();

      const movieReviewDetailModal = new MovieReviewDetailModal($app, movieDetail);

      movieReviewDetailModal.open();
    } catch (error) {
      console.error(error);

      ErrorFallbackModal.open();
    }
  }

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
    const genres = this?.props?.genres || '장르 없음';
    const overview = this.props?.overview || '설명이 존재하지 않습니다.';

    return /* html */ `
      <nav id="modal-review-detail-header" class="modal-review-detail-header">
        <span id="modal-review-detail-title">${this.props?.title}</span>
      </nav>
      <article class="modal-review-detail-content">
        <div id="movie-description-image-container" class="movie-description-image-container">
          <img 
            id="movie-description-image" 
            class="movie-description-image"
            src="${this.props?.image ?? DEFAULT_IMAGE_URL}"
            onerror="
              this.style.border='1px solid #e2e2e2';
              this.src='${DEFAULT_IMAGE_URL}'
            "
          />
        </div>
        <section id="modal-review-detail-section" class="modal-review-detail-section">
          <div class="movie-description-container text-body">
            <p class="movie-description-title"><span id="movie-genre" class="movie-genre">${genres}</span> <img class="movie-title-image" src="${FilledStar}" /> <span id="movie-score" class="movie-score">${
      this.props?.score
    }</span></p>
            <p id="movie-description-body" class="movie-description-body">${overview}</p>
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
