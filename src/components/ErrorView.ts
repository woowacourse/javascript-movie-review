import { renderAlertModalForNullEl } from '../service/AlertModalForNullEl';
import { createElementWithAttribute } from '../utils';

import RefreshButton from './RefreshButton';

class ErrorView {
  constructor(errorMessage: string) {
    this.#renderErrorView(errorMessage);
  }

  #makeErrorDiv(errorMessage: string) {
    const $errorDiv = document.createElement('div');
    const $retryButton = new RefreshButton().element;
    const $errorMessage = createElementWithAttribute('div', {
      class: 'error-message',
    });

    $errorDiv.classList.add('error-view');
    $errorMessage.textContent = errorMessage;
    $errorDiv.appendChild($errorMessage);
    $errorDiv.appendChild($retryButton);

    return $errorDiv;
  }

  #renderErrorView(errorMessage: string) {
    const $main = document.querySelector('main');
    const $errorDiv = this.#makeErrorDiv(errorMessage);

    if (!$main) {
      renderAlertModalForNullEl('main');
      return;
    }

    $main.appendChild($errorDiv);
  }
}

export default ErrorView;
