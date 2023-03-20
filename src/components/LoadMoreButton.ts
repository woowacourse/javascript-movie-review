import { $ } from '../utils/domSelector';

class LoadMoreButton {
  #element = document.createElement('button');
  #name = 'Load More';

  render(name: string) {
    const parentElement = $('.item-view');

    this.#name = name;
    this.#element.textContent = name;
    this.#element.classList.add('btn', 'primary', 'full-width');

    parentElement.appendChild(this.#element);
  }

  enable() {
    this.#element.disabled = false;
    this.#element.textContent = this.#name;
  }

  disable() {
    this.#element.disabled = true;
    this.#element.textContent = 'There are no more movies to load.';
  }

  addClickEventHandler(onClickLoadMoreButton: () => void) {
    this.#element.addEventListener('click', () => {
      onClickLoadMoreButton();
    });
  }
}

export default LoadMoreButton;
