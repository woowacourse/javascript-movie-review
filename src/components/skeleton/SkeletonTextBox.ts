import { SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class SkeletonTextBox {
  #element: HTMLElement;

  constructor(numberOfText: number) {
    this.#element = this.#makeElement(numberOfText);
  }

  get element() {
    return this.#element;
  }

  #makeElement(numberOfText: number) {
    const $skeletonText = createElementWithAttribute('div', {
      class: 'skeleton-text-box',
    });

    for (let i = 0; i < numberOfText; i += 1) {
      const $p = createElementWithAttribute('p', {
        class: `${SKELETON}  skeleton-text`,
      });
      $skeletonText.appendChild($p);
    }

    return $skeletonText;
  }
}

export default SkeletonTextBox;
