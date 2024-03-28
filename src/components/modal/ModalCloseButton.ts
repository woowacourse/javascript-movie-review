import XMarker from '../../images/xmark.svg';
import { ModalContainerController } from '../../controller';
import { createElementWithAttribute } from '../../utils';

class ModalCloseButton {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeCloseButton();
  }

  get element() {
    return this.#element;
  }

  #makeCloseButton() {
    const $button = createElementWithAttribute('button', {
      class: 'button-close-modal',
    });
    const $img = createElementWithAttribute('img', {
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
