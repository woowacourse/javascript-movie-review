import { MOVIE_LIST_CLASS, OBSERVER_TARGET } from '../../constants';
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
    const $div = createElementWithAttribute<HTMLLIElement>('li', {
      class: `${MOVIE_LIST_CLASS}__last-item`,
    });

    if (isMoreData) $div.classList.add(OBSERVER_TARGET.scroll);

    const $children = new NoMoreMovieDataItem().element;
    $div.appendChild($children);

    return $div;
  }
}

export default MovieListLastItem;
