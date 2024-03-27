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

class MovieListCard extends Component<MovieInterface> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $anchor = createElement({ tagName: 'a', attributeOptions: {} });

    $anchor.innerHTML = /* html */ `
      <div id="item-card" class="item-card">
        <img
          class="item-thumbnail"
          src="${this.props?.image ? `${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.image}` : ''}"
          loading="lazy",
          alt="${`${this.props?.title}`}"
          onerror="
            this.style.border='1px solid #e2e2e2';
            this.src='https://www.themoviedb.org/assets/2/v4/glyphicons/basic/glyphicons-basic-38-picture-grey-c2ebdbb057f2a7614185931650f8cee23fa137b93812ccb132b9df511df1cfac.svg';
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
      eventHandler: this.handleClickCard.bind(this),
    });
  }

  private handleClickCard(event: Event) {
    event.stopPropagation();

    MovieDetail.fetchMovieDetail(String(this.props?.id), {
      onSuccess: ({ id, overview, title, score, image, genres, ratingScore }) => {
        this.renderMovieReviewDetailModal({ id, overview, title, score, image, genres, ratingScore });
      },
      onError: (error) => {
        console.error(error);

        const $errorFallbackModal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.errorFallBackModal);

        $errorFallbackModal.showModal();
      },
    });
  }

  private renderMovieReviewDetailModal(movieDetail: MovieDetailInterface & RateDetail) {
    const $modal = querySelector<HTMLDialogElement>(ELEMENT_SELECTOR.movieReviewDetailModal);
    const $app = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.app);

    $modal.remove();

    const movieReviewDetailModal = new MovieReviewDetailModal($app, movieDetail);

    movieReviewDetailModal.open();
  }
}

export default MovieListCard;
