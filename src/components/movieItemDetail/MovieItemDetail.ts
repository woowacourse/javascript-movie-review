import '../../assets/images/star_empty.png';
import '../../assets/images/star_filled.png';
import './MovieItemDetail.css';

import { IMovie } from '../../types/movie';
import { dom } from '../../utils/dom';

import StarRating from './StarRating';
import MovieStorageService from '../../domains/MovieStorageService';
import MovieCollection from '../../domains/MovieCollection';

const SCORE_PER_STAR_RATING = 2;

class MovieItemDetail {
  $target: HTMLElement = document.createElement('article');
  #movie: IMovie & { myScore?: number };

  constructor(movie: IMovie) {
    this.$target.classList.add('movie-detail');
    this.$target.innerHTML = this.#template();
    this.#movie = movie;
    this.#updateMyScoreFromStorage();
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

    const MAX_COUNT = 5;
    dom.getElement(this.$target, '.movie-description__rating').append(...this.#createStarRating(MAX_COUNT));
  }

  #formatScore(score: number) {
    const FORMAT_FIXED_DIGIT = 1;
    return score.toFixed(FORMAT_FIXED_DIGIT).toString();
  }

  #updateMyScoreFromStorage() {
    const moviesInStorage = new MovieCollection(new MovieStorageService().load());
    if (moviesInStorage.has(this.#movie)) {
      const thisMovie = moviesInStorage.getFiltered(this.#movie)[0];
      this.#movie.myScore = thisMovie.myScore;
    } else {
      this.#movie.myScore = 0;
    }
  }

  #createStarRating(maxStarCount: number) {
    const $label = document.createElement('label');
    $label.innerText = '내 별점';

    const starRating = new StarRating(maxStarCount);

    starRating.clickedId = this.#scoreToId(this.#movie.myScore!);
    starRating.render();
    starRating.$target.addEventListener('click', (e: MouseEvent) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      this.#movie.myScore = this.#idToScore(starRating.clickedId);
      new MovieStorageService().update(this.#movie);
    });

    const $ratingCaption = this.#createRatingCaption(starRating);
    $ratingCaption.classList.add('font-body');
    return [$label, starRating.$target, $ratingCaption];
  }

  #createRatingCaption($rating: StarRating) {
    const $ratingCaption: HTMLLabelElement = document.createElement('label');
    $ratingCaption.classList.add('rating-caption');
    const score = this.#idToScore($rating.clickedId);
    this.#updateRatingCaption($ratingCaption, score);

    $rating.$target.addEventListener('click', (e: MouseEvent) => {
      if (!(e.target instanceof HTMLImageElement)) return;
      const score = this.#idToScore($rating.clickedId);
      this.#updateRatingCaption($ratingCaption, score);
    });

    return $ratingCaption;
  }

  #idToScore(id: number) {
    return this.#countToScore(id + 1);
  }
  #scoreToId(score: number) {
    return this.#scoreToCount(score) - 1;
  }

  #scoreToCount(score: number) {
    return score / SCORE_PER_STAR_RATING;
  }
  #countToScore(count: number) {
    return count * SCORE_PER_STAR_RATING;
  }

  #updateRatingCaption($ratingCaption: HTMLElement, score: number) {
    const Ratings = ['나의 점수는?', '최악이에요', '별로예요', '보통이에요', '재미있어요', '명작이에요'];
    $ratingCaption.innerText = `${this.#movie.myScore!.toString().padStart(2, ' ')} ${Ratings[this.#scoreToCount(this.#movie.myScore!)]}`;
  }
}

export default MovieItemDetail;
