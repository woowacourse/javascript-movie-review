import { createElementWithAttribute } from '../utils';

class RefreshButton {
  #element: HTMLButtonElement;

  constructor() {
    this.#element = this.#makeRetryButton();
  }

  get element() {
    return this.#element;
  }

  #makeRetryButton() {
    const $retryButton = createElementWithAttribute('button', {
      class: 'button-refresh',
    }) as HTMLButtonElement;

    $retryButton.textContent = '새로 고침 🔁';

    $retryButton.addEventListener('click', (event) =>
      this.#handleClickRetryButton(event),
    );

    return $retryButton;
  }

  #handleClickRetryButton = (event: Event) => {
    event.stopPropagation();
    window.location.reload();
  };
}

export default RefreshButton;
