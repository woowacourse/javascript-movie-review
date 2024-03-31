import { Dom } from '../../utils/Dom';

function toast(errorMessage: string) {
  const toastElement = document.createElement('div');
  toastElement.classList.add('toast');
  toastElement.textContent = errorMessage;
  toastElement.setAttribute('aria-live', 'assertive');

  Dom.getElement(document, 'body').appendChild(toastElement);

  setTimeout(() => toastElement.remove(), 4500);
}

export default toast;
