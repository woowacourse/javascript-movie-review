import { SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class SkeletonMovieImg {
  #element: HTMLElement;

  constructor() {
    this.#element = createElementWithAttribute('div', {
      class: `movie-thumbnail ${SKELETON}`,
    });
  }

  get element() {
    return this.#element;
  }
}

export default SkeletonMovieImg;
