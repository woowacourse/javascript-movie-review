import Component from '../../common/Component/Component';
import { isMovieRateScore } from './MovieScoreBoard.util';
import { MOVIE_SCORE_MESSAGE } from './MovieScoreBoard.constant';

import MovieDetail from '../../../domain/MovieDetail/MovieDetail';

import { createElement } from '../../../utils/dom/createElement/createElement';
import { on } from '../../../utils/dom/eventListener/eventListener';
import { querySelector, querySelectorAll } from '../../../utils/dom/selector';

import { ELEMENT_SELECTOR } from '../../../constants/selector';

import { EmptyStar, FilledStar } from '../../../assets';

import './MovieScoreBoard.css';

interface MovieScoreBoardProps {
  id: number;
  title: string;
  ratingScore?: number;
}

class MovieScoreBoard extends Component<MovieScoreBoardProps> {
  protected render() {
    this.$element.append(this.createComponent());

    this.renderStars(this.props?.ratingScore ?? 0);
  }

  protected createComponent() {
    const $movieScoreBoard = createElement({
      tagName: 'div',
      attributeOptions: { class: 'movie-score-board text-body' },
    });

    const ratingScore = this.props?.ratingScore ?? 0;

    if (isMovieRateScore(ratingScore)) {
      $movieScoreBoard.innerHTML = /* html */ `
        <span class="movie-score-board-title">내 별점</span>
        <div id="movie-score-board-stars" class="movie-score-board-stars">
          <img data-value="1" src="${EmptyStar}" />
          <img data-value="2" src="${EmptyStar}" />
          <img data-value="3" src="${EmptyStar}" />
          <img data-value="4" src="${EmptyStar}" />
          <img data-value="5" src="${EmptyStar}" />
        </div>
        <span id="movie-score-board-rating">${ratingScore}</span>
        <span id="movie-score-board-need-rating" class="movie-score-board-need-rating">${MOVIE_SCORE_MESSAGE[ratingScore]}</span>
      `;

      return $movieScoreBoard;
    }

    return '';
  }

  protected setEvent(): void {
    const target = querySelector<HTMLDivElement>(ELEMENT_SELECTOR.movieScoreBoardStars, this.$element);

    on({
      target,
      eventName: 'click',
      eventHandler: this.renderMovieScoreBoard.bind(this),
    });
  }

  private renderMovieScoreBoard(event: Event) {
    if (event.target instanceof HTMLElement && event.target.dataset.value) {
      const ratingScore = Number(event.target.dataset.value) * 2;

      if (this.props?.id && this.props?.title) {
        MovieDetail.updateRatingScore({ id: this.props.id, title: this.props.title, ratingScore });

        this.updateMovieScoreBoard(ratingScore);
      }
    }
  }

  private updateMovieScoreBoard(ratingScore: number): void {
    this.renderStars(ratingScore);

    const $rating = querySelector(ELEMENT_SELECTOR.movieScoreBoardRating, this.$element);

    $rating.textContent = String(ratingScore);

    if (isMovieRateScore(ratingScore)) {
      const $ratingNeedRating = querySelector(ELEMENT_SELECTOR.movieScoreBoardNeedRating, this.$element);

      $ratingNeedRating.textContent = MOVIE_SCORE_MESSAGE[ratingScore];
    }
  }

  private renderStars(ratingValue: number) {
    const stars: NodeListOf<HTMLImageElement> = querySelectorAll(ELEMENT_SELECTOR.movieScoreBoardImage, this.$element);

    stars.forEach((star, imageIndex) => {
      const maxImageIndex = Math.ceil(ratingValue / 2);

      star.src = imageIndex < maxImageIndex ? FilledStar : EmptyStar;
    });
  }
}

export default MovieScoreBoard;
