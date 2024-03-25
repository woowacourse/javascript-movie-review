import Component from '../../common/Component/Component';
import MovieReviewDetailModal from '../MovieReviewDetailModal/MovieReviewDetailModal';

import type { MovieResponse } from '../../../domain/Movie/Movie.type';
import MovieDetail from '../../../domain/Movie/MovieDetail/MovieDetail';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { querySelector } from '../../../utils/dom/selector';
import { on } from '../../../utils/dom/eventListener/eventListener';

import { FilledStar } from '../../../assets';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

class MovieListCard extends Component<MovieResponse> {
  protected render() {
    this.$element.append(this.createComponent());
  }

  protected createComponent() {
    const $anchor = createElement({ tagName: 'a', attributeOptions: {} });

    $anchor.innerHTML = /* html */ `
      <div id="item-card" class="item-card">
        <img
          class="item-thumbnail"
          src=${`${process.env.IMAGE_BASE_URL}/w220_and_h330_face/${this.props?.poster_path}`}
          loading="lazy",
          alt=${`${this.props?.title}`}
        />
        <p class="item-title">${this.props?.title}</p>
        <p class="item-score">${this.props?.vote_average.toFixed(1)} <img src=${`${FilledStar}`} alt="별점" /> </p>
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

    const movieDetail = new MovieDetail();

    const $modal = querySelector(ELEMENT_SELECTOR.movieReviewDetailModal);

    movieDetail.fetchMovieDetail(String(this.props?.id), {
      onSuccess: (movieDetail) => {
        $modal.remove();

        new MovieReviewDetailModal(querySelector(ELEMENT_SELECTOR.app), {
          overview: movieDetail.overview,
          title: movieDetail.title,
          score: String(movieDetail.vote_average),
          image: movieDetail.poster_path,
          genre: movieDetail.genres.map(({ name }) => name).join(', '),
        }).open();
      },
      onError: (error) => {
        console.error(error);
      },
    });
  }
}

export default MovieListCard;
