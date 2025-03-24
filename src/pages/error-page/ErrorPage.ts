import ErrorMessage from '../../component/common/error-message/ErrorMessage';
import { ERROR_MESSAGE } from '../../constants/errorMessage';

class ErrorPage {
  #container;

  constructor() {
    this.#container = document.createElement('div');
  }

  get element() {
    return this.#container.appendChild(new ErrorMessage({ errorMessage: ERROR_MESSAGE.FETCH_FAILED }).element);
  }
}

export default ErrorPage;
