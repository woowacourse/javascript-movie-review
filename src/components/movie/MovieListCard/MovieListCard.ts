import Component from '../../common/Component/Component';
import MovieReviewDetailModal from '../MovieReviewDetailModal/MovieReviewDetailModal';

import MovieDetail from '../../../domain/MovieDetail/MovieDetail';
import type { MovieInterface } from '../../../domain/Movie/Movie.type';
import type { MovieDetailInterface, RateDetail } from '../../../domain/MovieDetail/MovieDetail.type';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { FilledStar } from '../../../assets';
import { DEFAULT_IMAGE_URL } from '../../../constants/movie';

class MovieListCard extends Component<MovieInterface> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $anchor = createElement({ tagName: 'a' });

    $anchor.innerHTML = /* html */ `
      <div id="item-card" class="item-card">
        <img
          class="item-thumbnail"
          src="${this.props?.image ? `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.image}` : ''}"
          loading="lazy",
          alt="${`${this.props?.title}`}"
          onerror="
            this.style.border='1px solid #e2e2e2';
            this.src='${DEFAULT_IMAGE_URL}';
          "
        />
        <p class="item-title">${this.props?.title}</p>
        <p class="item-score">${this.props?.score.toFixed(1)} <img src=${`${FilledStar}`} alt="별점" /> </p>
      </div>
    `;

    return $anchor;
  }

  protected setEvent() {
    const target = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.itemCard, this.$element);

    on({
      target,
      eventName: 'click',
      eventHandler: this.renderModal.bind(this),
    });
  }

  private async renderModal(event: Event) {
    event.stopPropagation();

    try {
      const { id, overview, title, score, image, genres, ratingScore } = await MovieDetail.fetchMovieDetail(
        String(this.props?.id),
      );

      this.renderMovieReviewDetailModal({ id, overview, title, score, image, genres, ratingScore });
    } catch (error) {
      console.error(error);

      this.renderErrorFallbackModal();
    }
  }

  private renderMovieReviewDetailModal(movieDetail: MovieDetailInterface & RateDetail) {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal);
    const $app = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.app);

    $modal.remove();

    const movieReviewDetailModal = new MovieReviewDetailModal($app, movieDetail);

    movieReviewDetailModal.open();
  }

  private renderErrorFallbackModal() {
    const $errorFallbackModal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.errorFallBackModal);

    $errorFallbackModal.showModal();
  }
}

export default MovieListCard;
