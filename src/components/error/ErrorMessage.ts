import { createElementWithAttribute } from '../../utils';

class ErrorMessage {
  #element: HTMLElement;

  constructor(message: string) {
    this.#element = this.#makeErrorMessage(message);
  }

  get element() {
    return this.#element;
  }

  #makeErrorMessage(message: string) {
    const $errorMessage = createElementWithAttribute('div', {
      class: 'error-message',
    });

    message.split('.').forEach((item) => {
      const $text = document.createElement('p');
      $text.textContent = item.trim();
      $errorMessage.appendChild($text);
    });

    return $errorMessage;
  }
}

export default ErrorMessage;
