import { createElementWithAttribute } from '../../utils';

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
        class: 'movie-thumbnail skeleton',
      }),
    );
  }

  #addSkeletonTitle($card: HTMLElement) {
    $card.appendChild(
      createElementWithAttribute('div', {
        class: 'movie-title skeleton',
      }),
    );
  }

  #addSkeletonScore($card: HTMLElement) {
    $card.appendChild(
      createElementWithAttribute('div', {
        class: 'movie-score skeleton',
      }),
    );
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
