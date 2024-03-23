import { renderAlertModalForNullEl } from '../../service/AlertModalForNullEl';
import { createElementWithAttribute } from '../../utils';

import SkeletonList from './SkeletonList';

class SkeletonListContainer {
  constructor() {
    this.#renderSkeletonListContainer();
  }

  #makeSkeletonListTitle = () => {
    const $title = document.createElement('h2');
    $title.textContent = '로딩 중...';

    return $title;
  };

  #makeSkeletonListContainer() {
    const $section = createElementWithAttribute('section', {
      class: 'skeleton-list-container',
    });

    $section.appendChild(this.#makeSkeletonListTitle());
    $section.appendChild(new SkeletonList().element);

    return $section;
  }

  #renderSkeletonListContainer() {
    const $main = document.querySelector('main');

    if (!$main) {
      renderAlertModalForNullEl('main');
      return;
    }

    const $skeletonListContainer = this.#makeSkeletonListContainer();
    $main?.appendChild($skeletonListContainer);
  }
}

export default SkeletonListContainer;
