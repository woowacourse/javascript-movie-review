import { MOVIE_INFO_COMMON_CLASS } from '../../constants';
import { ModalContainerController } from '../../controller';
import { createElementWithAttribute } from '../../utils';
import { ModalContainer } from '../modal';

import SkeletonMovieImg from './SkeletonMovieImg';
import SkeletonMovieTitle from './SkeletonMovieTitle';
import SkeletonTextBox from './SkeletonTextBox';

class SkeletonInfo {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeSkeletonInfo();
  }

  #makeSkeletonInfo() {
    const $skeletonInfo = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS} skeleton-info`,
    });
    const $skeletonInfoInner = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner`,
    });
    const $header = this.#makeInnerHeader();
    const $contents = this.#makeInnerContents();
    $skeletonInfoInner.appendChild($header);
    $skeletonInfoInner.appendChild($contents);
    $skeletonInfo.appendChild($skeletonInfoInner);

    return $skeletonInfo;
  }

  #makeInnerContents() {
    const $contents = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner__contents`,
    });
    const $img = new SkeletonMovieImg().element;
    const $description = this.#makeDescription();

    $contents.appendChild($img);
    $contents.appendChild($description);

    return $contents;
  }

  #makeInnerHeader() {
    const $header = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__inner__header`,
    });
    const $title = new SkeletonMovieTitle().element;
    $header.appendChild($title);

    return $header;
  }

  #makeDescription() {
    const $description = createElementWithAttribute('div', {
      class: `${MOVIE_INFO_COMMON_CLASS}__description`,
    });

    const $textBox = new SkeletonTextBox(3).element;
    const $userScore = createElementWithAttribute('div', {
      class: 'user-score skeleton',
    });
    $description.appendChild($textBox);
    $description.appendChild($userScore);

    return $description;
  }

  renderSkeletonInfo() {
    new ModalContainer({
      $children: this.#element,
    });
  }

  removeSkeletonInfo() {
    const $skeletonInfo = document.querySelector('.skeleton-info');
    if (!$skeletonInfo) return;
    ModalContainerController.closeModalContainer();
  }
}

export default SkeletonInfo;
