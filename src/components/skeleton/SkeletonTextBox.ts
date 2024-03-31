import { SKELETON } from '../../constants';
import { createElementWithAttribute } from '../../utils';

const SKELETON_TEXT_CLASS = `${SKELETON}-text`;

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
      class: `${SKELETON_TEXT_CLASS}-box`,
    });

    for (let i = 0; i < numberOfText; i += 1) {
      const $p = createElementWithAttribute('p', {
        class: `${SKELETON} ${SKELETON_TEXT_CLASS}`,
      });
      $skeletonText.appendChild($p);
    }

    return $skeletonText;
  }
}

export default SkeletonTextBox;
