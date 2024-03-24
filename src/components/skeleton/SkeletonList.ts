import { createElementWithAttribute } from '../../utils';

import SkeletonCard from './SkeletonCard';

class SkeletonList {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeSkeletonList();
  }

  get element() {
    return this.#element;
  }

  #makeSkeletonItem = () => {
    const $skeleton = document.createElement('li');

    const $card = new SkeletonCard().element;
    $skeleton.appendChild($card);

    return $skeleton;
  };

  #makeSkeletonList = () => {
    const $ul = createElementWithAttribute('ul', {
      class: 'movie-list skeleton-list',
    });

    Array.from({ length: 12 }).forEach(() => {
      $ul.appendChild(this.#makeSkeletonItem());
    });

    return $ul;
  };
}

export default SkeletonList;
