import { MOVIE_CHILDREN_CLASS } from '../../constants';
import { createElementWithAttribute } from '../../utils';

import SkeletonMovieImg from './SkeletonMovieImg';
import SkeletonMovieTitle from './SkeletonMovieTitle';

class SkeletonCard {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeSkeletonCard();
  }

  get element() {
    return this.#element;
  }

  #makeSkeletonCard() {
    const $card = createElementWithAttribute('div', {
      class: MOVIE_CHILDREN_CLASS.card,
    });
    $card.appendChild(new SkeletonMovieImg().element);
    $card.appendChild(new SkeletonMovieTitle().element);
    $card.appendChild(new SkeletonMovieImg().element);

    return $card;
  }
}

export default SkeletonCard;
