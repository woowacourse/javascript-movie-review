export default class MoreButton {
  #buttonElement = document.createElement('button');

  constructor() {
    this.#buttonElement.classList.add('btn', 'primary', 'full-width');
    this.#buttonElement.textContent = '더 보기';
  }

  get element() {
    return this.#buttonElement;
  }
}
