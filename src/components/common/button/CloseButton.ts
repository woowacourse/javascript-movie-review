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
    $image.alt = '닫기 버튼';
    return $image;
  }
}

export default CloseButton;
