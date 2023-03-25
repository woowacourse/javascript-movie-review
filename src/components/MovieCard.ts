import FilledStar from '../assets/star_filled.png';
import { Component } from '../type/Component';
import { Movie } from '../type/Movie';

export default class MovieCard implements Component {
  $element: Element;
  #movie: Movie;
  #renderModal;

  constructor($parent: Element, movie: Movie, renderModal: (movie: Movie) => void) {
    this.$element = document.createElement('li');
    this.#movie = movie;
    this.#renderModal = renderModal;

    $parent.insertAdjacentElement('beforeend', this.$element);
  }

  render() {
    this.$element.innerHTML = this.template();
    this.setEvent();
  }

  template() {
    const { title, posterPath, voteAverage } = this.#movie;

    return /* html */ `
    <div class="item-card">
      <img
      class="item-thumbnail"
      src="https://image.tmdb.org/t/p/w220_and_h330_face${posterPath}"
      loading="lazy"
      alt=${title}
      />
      <p class="item-title">${title}</p>
      <p class="item-score"><img src=${FilledStar} alt="별점" /> ${voteAverage}</p>
    </div>
    `;
  }

  setEvent() {
    (<HTMLParagraphElement>this.$element.querySelector('.item-title')).addEventListener('click', () => {
      this.#renderModal(this.#movie);
    });
    (<HTMLParagraphElement>this.$element.querySelector('.item-thumbnail')).addEventListener('click', () => {
      this.#renderModal(this.#movie);
    });
  }
}
