import { Component } from '../type/Component';
import { Movie } from '../type/Movie';
import UserDataHandler from '../domain/UserDataHandler';
import FilledStar from '../assets/star_filled.png';
import '../css/modal.css';
import MovieHandler from '../domain/MovieHandler';

const RATING_COMMENTS: { [rating: string]: string } = {
  0: '선택해 주세요',
  2: '최악이에요',
  4: '별로에요',
  6: '보통이에요',
  8: '재밌어요',
  10: '최고에요',
};

export default class MovieDetailsModal implements Component {
  $element: Element;
  #movie: Movie;
  #userScore: number;

  constructor($parent: Element, movie: Movie) {
    this.$element = document.createElement('div');
    this.$element.classList.add('modal-container');
    this.#movie = movie;
    this.#userScore = UserDataHandler.loadUserScore(movie.id) || 0;

    const $backdrop = document.createElement('div');
    $backdrop.classList.add('modal-backdrop', 'modal');

    $parent.insertAdjacentElement('beforeend', $backdrop);
    $backdrop.insertAdjacentElement('beforeend', this.$element);
  }

  set movie(movie: Movie) {
    this.#movie = movie;
  }

  get movieID() {
    return this.#movie.id;
  }

  render() {
    this.$element.innerHTML = this.template();
    this.loadUserScore();
    this.setEvent();
    this.show();
  }

  template() {
    const { title, posterPath, voteAverage, overview, genreIDs } = this.#movie;

    return /* html */ `
      <div class="modal-title">${title}</div>
      <button type="button" class="button--close"></button>
      <img class="movie-poster"
      class="item-thumbnail"
      src="https://image.tmdb.org/t/p/w500${posterPath}"
      >
      <p class="movie-genre">${MovieHandler.getGenres(genreIDs).join(', ')}</p>
      <div class="movie-score">
        <img src=${FilledStar}>
        <span>${voteAverage}</span>
      </div>
      <p class="movie-overview">${overview}</p>
      <div class="movie-user-rating">
        <p>내 별점</p>
        <div class="rating">
          <input type="radio" id="rating1" name="rating" value="2" >
          <label for="rating1"></label>
          <input type="radio" id="rating2" name="rating" value="4" >
          <label for="rating2"></label>
          <input type="radio" id="rating3" name="rating" value="6" >
          <label for="rating3"></label>
          <input type="radio" id="rating4" name="rating" value="8" >
          <label for="rating4"></label>
          <input type="radio" id="rating5" name="rating" value="10" >
          <label for="rating5"></label>
        </div>
        <p id="rating-number">0</p>
        <p id="rating-comment">${RATING_COMMENTS[0]}</p>
      </div>
  `;
  }

  setEvent() {
    (<HTMLButtonElement>this.$element.querySelector('.button--close')).addEventListener('click', this.hide.bind(this), {
      once: true,
    });

    document.addEventListener('keydown', this.onEscKeyDown.bind(this), {
      once: true,
    });

    const radios = this.$element.querySelectorAll('input[type=radio][name="rating"]');
    radios.forEach((radio) => {
      radio.addEventListener('change', this.onChangeUserScore.bind(this));
    });
  }

  hide() {
    (<HTMLDivElement>this.$element.closest('.modal-backdrop')).classList.remove('modal--open');
  }

  show() {
    (<HTMLDivElement>this.$element.closest('.modal-backdrop')).classList.add('modal--open');
  }

  onEscKeyDown(e: KeyboardEvent) {
    (e.key === 'Escape' || e.key === 'Esc') && this.hide();
  }

  onChangeUserScore(e: Event) {
    this.#userScore = +(<HTMLInputElement>e.target).value;

    (<HTMLParagraphElement>this.$element.querySelector('#rating-number')).textContent = this.#userScore.toString();
    (<HTMLParagraphElement>this.$element.querySelector('#rating-comment')).textContent =
      RATING_COMMENTS[this.#userScore];

    this.saveUserScore();
  }

  saveUserScore() {
    UserDataHandler.saveUserScore(this.#movie.id, this.#userScore);
  }

  loadUserScore() {
    const score = UserDataHandler.loadUserScore(this.#movie.id);
    if (score) {
      this.#userScore = score;

      (<HTMLInputElement>this.$element.querySelector(`#rating${score / 2}`)).checked = true;
      (<HTMLParagraphElement>this.$element.querySelector('#rating-number')).textContent = score.toString();
      (<HTMLParagraphElement>this.$element.querySelector('#rating-comment')).textContent = RATING_COMMENTS[score];
    }
  }
}
