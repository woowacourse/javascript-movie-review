import { ElementFinder } from '../../controller';
import { createElementWithAttribute } from '../../utils';

import SkeletonList from './SkeletonList';

class SkeletonListContainer {
  constructor() {
    this.#renderSkeletonListContainer();
  }

  #makeSkeletonListContainer() {
    const $section = createElementWithAttribute('section', {
      class: 'skeleton-list-container',
    });

    $section.appendChild(new SkeletonList().element);

    return $section;
  }

  #renderSkeletonListContainer() {
    const $main = ElementFinder.findElementBySelector('main');

    if (!$main) return;

    const $skeletonListContainer = this.#makeSkeletonListContainer();
    $main.appendChild($skeletonListContainer);
  }
}

export default SkeletonListContainer;
