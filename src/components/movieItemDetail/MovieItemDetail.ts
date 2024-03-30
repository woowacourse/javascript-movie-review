import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';
import './MovieItemDetail.css';
import CloseButton from '../common/button/CloseButton';

import '../../assets/images/star_empty.png';
import '../../assets/images/star_filled.png';
import StarToggle from './StarToggle';
import StarRating from './StarRating';

class MovieItemDetail {
  $target: HTMLElement = document.createElement('article');

  constructor(movie?: IMovie) {
    this.$target.classList.add('movie-detail');
    this.$target.innerHTML = this.#template();
    if (movie === undefined) return;
    this.paint(movie);
  }

  #template() {
    return `<div class="movie-detail-header">
        <h3 class="movie-detail-header__text"></h3>
      </div>
      <div class="movie-detail-content">
        <div class="movie-detail-content__poster">
          <img class="movie-detail-content__poster-image" />
        </div>
        <div class="movie-description">
          <div class="movie-explanation">
            <div class="movie-explanation__header">
              <span class="movie-explanation__header-genre">
              </span>
              <span class="movie-explanation__header-rating">
                <span><img width="24px" height="24px" class="star-icon" src="./images/star_filled.png" alt="별점" /></span>
                <span class="movie-explanation__header-rating-text"></span>
              </span>
            </div>
            <div class="movie-explanation__content">
            </div>
          </div>
          <div class="movie-description__rating">
          <div>내 별점</div>
          <div class="movie-description__star-rating"></div>
          <div class="movie-description__star-rating-caption"></div>
          </div>
        </div>
      </div> `;
  }

  paint(movie: IMovie) {
    const $image = dom.getElement<HTMLImageElement>(this.$target, '.movie-detail-content__poster-image');
    const $title = dom.getElement(this.$target, '.movie-detail-header__text');
    const $headerGenre = dom.getElement(this.$target, '.movie-explanation__header-genre');
    const $headerScore = dom.getElement(this.$target, '.movie-explanation__header-rating-text');

    const $explanation = dom.getElement(this.$target, '.movie-explanation__content');

    $image.setAttribute('src', movie.imageSrc);
    $image.setAttribute('alt', movie.title);
    $title.innerText = movie.title;
    $headerGenre.innerText = movie.genre.join(', ');
    $headerScore.innerText = this.#formatScore(movie.score);
    $explanation.innerText = movie.description;

    dom.getElement(this.$target, '.movie-detail-header').append(new CloseButton().$target);
    dom.getElement(this.$target, '.movie-description__star-rating').append(this.#createStarRating(6));
  }

  #formatScore(score: number) {
    const FORMAT_FIXED_DIGIT = 1;
    return score.toFixed(FORMAT_FIXED_DIGIT).toString();
  }

  #createStarRating(score: number) {
    // const SCORE_PER_STAR_RATING = 2;
    // const COUNT_OF_STARS = score / SCORE_PER_STAR_RATING;
    // const stars = Array.from({ length: COUNT_OF_STARS }).map(() => new StarToggle(true).$target);
    // const emptyStars = Array.from({ length: 5 - COUNT_OF_STARS }).map(() => new StarToggle(false).$target);

    return new StarRating(5).$target;
  }
}

export default MovieItemDetail;
