import { createElementWithAttribute } from '../../utils';

import ErrorImg, { ErrorImgType } from './ErrorImg';
import ErrorMessage from './ErrorMessage';

export interface ErrorBoxProps {
  errorMessage: string | HTMLElement;
  errorImageType?: ErrorImgType;
  extraExtraBoxClass?: string;
}

class ErrorBox {
  #element: HTMLElement;

  constructor(props: ErrorBoxProps) {
    this.#element = this.#makeErrorBox(props);
  }

  get element() {
    return this.#element;
  }

  #makeErrorMessageEl(errorMessage: string | HTMLElement) {
    if (errorMessage instanceof HTMLElement) {
      return errorMessage;
    }

    return new ErrorMessage(errorMessage).element;
  }

  #makeErrorBox({
    errorMessage,
    errorImageType = 'circle',
    extraExtraBoxClass,
  }: ErrorBoxProps) {
    const $errorBox = createElementWithAttribute('div', { class: 'error-box' });
    if (extraExtraBoxClass) $errorBox.classList.add(extraExtraBoxClass);
    const $errorImg = new ErrorImg(errorImageType).element;
    const $errorMessage = this.#makeErrorMessageEl(errorMessage);

    $errorBox.appendChild($errorImg);
    $errorBox.appendChild($errorMessage);

    return $errorBox;
  }
}

export default ErrorBox;
