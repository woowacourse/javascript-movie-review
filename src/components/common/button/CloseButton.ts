import Button from './Button';
import '../../../assets/images/close_button.svg';
import './CloseButton.css';

class CloseButton extends Button {
  constructor() {
    super({
      classNames: ['close-button'],
      children: [CloseButton.#createImage()],
      onClick: (event: MouseEvent) => {},
    });
  }

  static #createImage() {
    const $image = document.createElement('img');
    $image.src = './images/close_button.svg';
    return $image;
  }
}

export default CloseButton;
