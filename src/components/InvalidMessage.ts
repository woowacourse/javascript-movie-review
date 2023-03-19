import { INVALID_MESSAGE } from '../constants/invalidMessage';
import MovieList from '../domain/MovieList';
import { InvalidMessageType } from '../types/ui';
import { $ } from '../utils/domSelector';

class InvalidMessage {
  private static instance: InvalidMessage;
  private messageContainer: HTMLDivElement;

  private constructor() {
    this.init();
    this.messageContainer = $<HTMLDivElement>('.error-message');
  }

  static getInstance(): InvalidMessage {
    if (!InvalidMessage.instance) {
      InvalidMessage.instance = new InvalidMessage();
    }

    return InvalidMessage.instance;
  }

  private init() {
    MovieList.on('movieListReset', () => {
      this.clear();
    });
  }

  render(type: InvalidMessageType, message?: string) {
    const heading = INVALID_MESSAGE[type].HEADING;
    const template = `
      <h3>${typeof heading === 'function' && message ? heading(message) : heading}</h3>
      <p>${INVALID_MESSAGE[type].CONTENT}</p>`;

    this.messageContainer.insertAdjacentHTML('beforeend', template);
    this.messageContainer.classList.remove('hide');
  }

  clear() {
    this.messageContainer.textContent = '';
  }
}

export default InvalidMessage.getInstance();
