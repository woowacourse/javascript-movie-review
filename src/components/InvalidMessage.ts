import { INVALID_MESSAGE } from '../constants/invalidMessage';
import { InvalidMessageType } from '../types/ui';
import { $ } from '../utils/domSelector';

const InvalidMessage = {
  render(type: InvalidMessageType, message?: string) {
    const heading = INVALID_MESSAGE[type].HEADING;
    const template = `
      <h3>${typeof heading === 'function' && message ? heading(message) : heading}</h3>
      <p>${INVALID_MESSAGE[type].CONTENT}</p>`;

    const errorMessage = $<HTMLDivElement>('.error-message');
    errorMessage.insertAdjacentHTML('beforeend', template);
    errorMessage.classList.remove('hide');
  },
};

export default InvalidMessage;
