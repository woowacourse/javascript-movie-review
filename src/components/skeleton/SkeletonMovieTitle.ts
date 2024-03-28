import { SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class SkeletonMovieTitle {
  #element: HTMLElement;

  constructor() {
    this.#element = createElementWithAttribute('div', {
      class: `movie-title ${SKELETON}`,
    });
  }

  get element() {
    return this.#element;
  }
}

export default SkeletonMovieTitle;
