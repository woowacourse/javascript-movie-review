import { MOVIE_CHILDREN_CLASS, SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class SkeletonMovieImg {
  #element: HTMLElement;

  constructor() {
    this.#element = createElementWithAttribute('div', {
      class: `${MOVIE_CHILDREN_CLASS.thumbnail} ${SKELETON}`,
    });
  }

  get element() {
    return this.#element;
  }
}

export default SkeletonMovieImg;
