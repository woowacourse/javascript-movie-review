import movieStore from '../store/MovieStore';

interface Props {
  onClick: () => void;
}

export default class MoreButton {
  #buttonElement = document.createElement('button');

  #onClick: Props['onClick'];

  constructor({ onClick }: Props) {
    this.#onClick = onClick;
    this.#buttonElement.classList.add('btn', 'primary', 'full-width');
    this.#buttonElement.textContent = '더 보기';
    this.#addClickEvent();
  }

  #addClickEvent() {
    this.#buttonElement.addEventListener('click', () => {
      movieStore.increasePageCount();
      this.#onClick();
    });
  }

  get element() {
    return this.#buttonElement;
  }
}
