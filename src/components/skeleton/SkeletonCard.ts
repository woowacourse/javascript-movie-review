import { SKELETON } from '../../constants';
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

  #addSkeletonImg($card: HTMLElement) {
    $card.appendChild(
      createElementWithAttribute('div', {
        class: `movie-thumbnail ${SKELETON}`,
      }),
    );
  }

  #addSkeletonTitle($card: HTMLElement) {
    $card.appendChild(new SkeletonMovieTitle().element);
  }

  #addSkeletonScore($card: HTMLElement) {
    $card.appendChild(new SkeletonMovieImg().element);
  }

  #makeSkeletonCard() {
    const $card = createElementWithAttribute('div', { class: 'movie-card' });
    this.#addSkeletonImg($card);
    this.#addSkeletonTitle($card);
    this.#addSkeletonScore($card);

    return $card;
  }
}

export default SkeletonCard;
