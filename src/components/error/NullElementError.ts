import { NULL_ELEMENT_ERROR_MESSAGE } from '../../constants';

import ErrorBox from './ErrorBox';
import ErrorMessage from './ErrorMessage';

class NullElementError {
  #element: HTMLElement;

  constructor() {
    this.#element = this.#makeErrorBox();
  }

  get element() {
    return this.#element;
  }

  #makeErrorBox() {
    const $errorMessage = new ErrorMessage(NULL_ELEMENT_ERROR_MESSAGE).element;

    return new ErrorBox({
      errorMessage: $errorMessage,
      extraExtraBoxClass: 'error-box-null-element',
    }).element;
  }
}

export default NullElementError;
