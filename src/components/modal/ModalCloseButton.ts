import XMarker from '../../images/xmark.svg';
import { createElementWithAttribute } from '../../utils';

import ModalContainerController from './controller/ModalContainerController';

class ModalCloseButton {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeCloseButton();
  }

  get element() {
    return this.#element;
  }

  #makeCloseButton() {
    const $button = createElementWithAttribute<HTMLButtonElement>('button', {
      class: 'button-close-modal',
      title: '모달 닫기 버튼',
    });
    const $img = createElementWithAttribute<HTMLImageElement>('img', {
      src: XMarker,
    });

    $button.appendChild($img);

    $button.addEventListener('click', this.#handleClickCloseButton);

    return $button;
  }

  #handleClickCloseButton(event: Event) {
    event.stopPropagation();

    ModalContainerController.closeModalContainer();
  }
}

export default ModalCloseButton;
