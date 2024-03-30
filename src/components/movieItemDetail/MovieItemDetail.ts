import '../../assets/images/star_empty.png';
import '../../assets/images/star_filled.png';
import './MovieItemDetail.css';

import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';

import StarRating from './StarRating';

const SCORE_PER_STAR_RATING = 2;

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

    dom.getElement(this.$target, '.movie-description__rating').append(...this.#createStarRating(5));
  }

  #formatScore(score: number) {
    const FORMAT_FIXED_DIGIT = 1;
    return score.toFixed(FORMAT_FIXED_DIGIT).toString();
  }

  #createStarRating(starCount: number) {
    const $label = document.createElement('label');
    $label.innerText = '내 별점';

    const starRating = new StarRating(starCount);

    const $ratingCaption = this.#createRatingCaption(starRating);
    $ratingCaption.classList.add('font-body');
    return [$label, starRating.$target, $ratingCaption];
  }

  #createRatingCaption($rating: StarRating) {
    const Ratings = ['최악이에요', '별로에요', '보통이에요', '좋아요', '최고에요'];
    const $ratingCaption: HTMLLabelElement = document.createElement('label');
    $ratingCaption.innerText = '';

    $rating.$target.addEventListener('click', (e: MouseEvent) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      const score = SCORE_PER_STAR_RATING * ($rating.clickedId + 1);
      $ratingCaption.innerText = `${score} ${Ratings[$rating.clickedId]}`;
    });

    return $ratingCaption;
  }
}

export default MovieItemDetail;
