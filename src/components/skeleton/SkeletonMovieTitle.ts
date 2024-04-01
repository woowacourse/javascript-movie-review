import { MOVIE_CHILDREN_CLASS, SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class SkeletonMovieTitle {
  #element: HTMLElement;

  constructor() {
    this.#element = createElementWithAttribute('div', {
      class: `${MOVIE_CHILDREN_CLASS.title} ${SKELETON}`,
    });
  }

  get element() {
    return this.#element;
  }
}

export default SkeletonMovieTitle;
