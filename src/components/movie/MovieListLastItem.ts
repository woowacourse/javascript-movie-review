import { createElementWithAttribute } from '../../utils';

import NoMoreMovieDataItem from './NoMoreMovieDataItem';

class MovieListLastItem {
  #element: HTMLElement;

  constructor(isMoreData: boolean) {
    this.#element = this.#makeElement(isMoreData);
  }

  get element() {
    return this.#element;
  }

  #makeElement(isMoreData: boolean) {
    const $div = createElementWithAttribute('li', {
      class: 'movie-list__last-item',
    });

    if (isMoreData) $div.classList.add('scroll-observer-target');

    const $children = new NoMoreMovieDataItem().element;
    $div.appendChild($children);

    return $div;
  }
}

export default MovieListLastItem;
