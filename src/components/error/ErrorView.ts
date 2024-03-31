import { createElementWithAttribute, ElementFinder } from '../../utils';
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
    $errorView.classList.add('error-view');

    $errorView.appendChild(new ErrorBox(props).element);
    $errorView.appendChild(new RefreshButton().element);

    return $errorView;
  }

  renderErrorViewInMain() {
    const $main = ElementFinder.findElementBySelector('main');

    if (!$main) return;

    $main.appendChild(this.#element);
  }

  renderErrorViewInModal() {
    const $inner = createElementWithAttribute('div', {
      class: 'movie-info-error',
    });

    $inner.appendChild(new ModalCloseButton().element);
    $inner.appendChild(this.#element);

    new ModalContainer({
      $children: $inner,
    });
  }
}

export default ErrorView;
