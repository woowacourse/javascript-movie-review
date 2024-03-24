import { renderAlertModalForNullEl } from '../../service';
import RefreshButton from '../RefreshButton';

import ErrorBox, { ErrorBoxProps } from './ErrorBox';

class ErrorView {
  constructor(props: ErrorBoxProps) {
    this.#renderErrorView(props);
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

  #renderErrorView(props: ErrorBoxProps) {
    const $main = document.querySelector('main');
    const $errorView = this.#makeErrorView(props);

    if (!$main) {
      renderAlertModalForNullEl('main');
      return;
    }

    $main.appendChild($errorView);
  }
}

export default ErrorView;
