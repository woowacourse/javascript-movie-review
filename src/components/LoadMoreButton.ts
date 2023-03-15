import { $ } from '../utils/domSelector';

class LoadMoreButton {
  #element = document.createElement('button');

  render(name: string) {
    const parentElement = $('.item-view');

    this.#element.textContent = name;
    this.#element.classList.add('btn', 'primary', 'full-width');

    parentElement.appendChild(this.#element);
  }

  addClickEventHandler(onClickLoadMoreButton: CallableFunction) {
    this.#element.addEventListener('click', () => {
      onClickLoadMoreButton();
    });
  }
}

export default LoadMoreButton;
