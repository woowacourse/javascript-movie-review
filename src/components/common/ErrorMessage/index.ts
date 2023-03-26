import { CLASS } from '../../../constants/selector';
import type { CustomErrorMessage } from '../../../constants/message';

import './ErrorMessage.style.css';

const ErrorMessage = {
  template(errorMessage: CustomErrorMessage) {
    return `
      <div class="${CLASS.MESSAGE}">
        <h2 class="message-title">${errorMessage.error}</h2>
        <p class="message-desc">${errorMessage.desc}</p>
      </div>
    `;
  },

  render(target: HTMLElement, errorMessage: CustomErrorMessage) {
    target.insertAdjacentHTML('beforeend', ErrorMessage.template(errorMessage));
  },

  remove(target: HTMLElement) {
    target.querySelector(`.${CLASS.MESSAGE}`)?.remove();
  },
};

export default ErrorMessage;
