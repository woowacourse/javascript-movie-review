import { Component } from '../type/Component';
import { Movie } from '../type/Movie';
import { UserDataHandler } from '../domain/UserDataHandler';
import FilledStar from '../assets/star_filled.png';
import '../css/modal.css';

export default class MovieDetailsModal implements Component {
  $element: Element;
  #movie: Movie;
  #userScore: number;

  constructor($parent: Element, movie: Movie) {
    this.$element = document.createElement('div');
    this.$element.classList.add('modal-container');
    this.$element.id = movie.id.toString();
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
    this.setEvent();
    this.show();
  }

  template() {
    const { title, posterPath, voteAverage, overview } = this.#movie;

    return /* html */ `
      <div class="modal-title">${title}</div>
      <button type="button" class="button--close"></button>
      <img class="movie-poster"
      class="item-thumbnail"
      src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
      />
      <p class="movie-genre">액션, 코미디, 범죄</p>
      <div class="movie-score">
        <img src=${FilledStar}/>
        <span>${voteAverage}</span>
      </div>
      <p class="movie-overview">${overview}</p>
      <div class="movie-user-rating">
        <p>내 별점</p>
        <div class="rating">
          <input type="radio" id="rating1" name="rating" value="1" >
          <label for="rating1"></label>
          <input type="radio" id="rating2" name="rating" value="2" >
          <label for="rating2"></label>
          <input type="radio" id="rating3" name="rating" value="3" >
          <label for="rating3"></label>
          <input type="radio" id="rating4" name="rating" value="4" >
          <label for="rating4"></label>
          <input type="radio" id="rating5" name="rating" value="5" >
          <label for="rating5"></label>
        </div>
        <p>5</p>
        <p>모르겠어요</p>
      </div>
  `;
  }

  setEvent() {
    (<HTMLButtonElement>this.$element.querySelector('.button--close')).addEventListener('click', this.hide.bind(this));
    (<HTMLDivElement>this.$element.closest('.modal-backdrop')).addEventListener('click', (e) => {
      e.target === this.$element.closest('.modal-backdrop') && this.hide();
    });
    document.addEventListener('keydown', (e) => (e.key === 'Escape' || e.key === 'Esc') && this.hide());
  }

  hide() {
    (<HTMLDivElement>this.$element.closest('.modal-backdrop')).classList.remove('modal--open');
  }

  show() {
    (<HTMLDivElement>this.$element.closest('.modal-backdrop')).classList.add('modal--open');
  }
}
