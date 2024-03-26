import Component from '../../common/Component/Component';
import { isMovieRateScore } from './MovieScoreBoard.util';

import MovieDetail from '../../../domain/Movie/MovieDetail/MovieDetail';

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
  static MOVIE_SCORE_GUIDANCE = {
    0: '별점을 부여해주세요.',
    2: '최악이예요',
    4: '별로예요',
    6: '보통이에요',
    8: '재미있어요',
    10: '명작이에요',
  } as const;

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
        <span id="movie-score-board-need-rating" class="movie-score-board-need-rating">${MovieScoreBoard.MOVIE_SCORE_GUIDANCE[ratingScore]}</span>
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
      eventHandler: this.handleClickStarImage.bind(this),
    });
  }

  private handleClickStarImage(event: Event) {
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

      $ratingNeedRating.textContent = MovieScoreBoard.MOVIE_SCORE_GUIDANCE[ratingScore];
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
