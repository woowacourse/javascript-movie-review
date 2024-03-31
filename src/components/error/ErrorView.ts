import { ElementFinder } from '../../controller';
import { createElementWithAttribute } from '../../utils';
import { ModalCloseButton, ModalContainer } from '../modal';
import RefreshButton from '../RefreshButton';

import ErrorBox, { ErrorBoxProps } from './ErrorBox';

class ErrorView {
  #element: HTMLElement;
  constructor(props: ErrorBoxProps) {
    this.#element = this.#makeErrorView(props);
  }

  #makeErrorView(props: ErrorBoxProps) {
    const $errorView = document.createElement('div');
    const $errorBox = new ErrorBox(props).element;
    const $retryButton = new RefreshButton().element;

    $errorView.classList.add('error-view');
    $errorView.appendChild($errorBox);
    $errorView.appendChild($retryButton);

    return $errorView;
  }

  renderErrorViewInMain() {
    const $main = ElementFinder.findElementBySelector('main');
    $main?.appendChild(this.#element);
  }

  renderErrorViewInModal() {
    const $inner = createElementWithAttribute('div', {
      class: 'movie-info-error',
    });
    const $modalCloseButton = new ModalCloseButton().element;
    $inner.appendChild($modalCloseButton);
    $inner.appendChild(this.#element);
    new ModalContainer({
      $children: $inner,
    });
  }
}

export default ErrorView;
