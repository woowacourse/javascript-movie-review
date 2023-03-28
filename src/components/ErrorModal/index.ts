import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

class ErrorModal extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }

  render(message: string) {
    this.innerHTML = template.replace('{message}', message);
    $<HTMLDivElement>('.error-modal', this).classList.remove('hide');
    setTimeout(() => {
      $<HTMLDivElement>('.error-modal', this).classList.add('hide');
    }, 3000);
  }
}

export default ErrorModal;
