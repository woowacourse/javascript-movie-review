import { MovieErrorEventData } from '../types/movie';
import { InvalidMessageType } from '../types/ui';
import { MOVIE_LIST_ERROR, MOVIE_LIST_RESET } from '../constants';
import { HTTP_ERROR_CODE, INVALID_MESSAGE } from '../constants/invalidMessage';
import { $ } from '../utils/domSelector';
import HTTPError from '../api/HTTPError';
import MovieListContainer from './MovieListContainer';
import MovieList from '../domain/MovieList';

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
    MovieList.on(MOVIE_LIST_RESET, () => {
      this.clear();
    });

    MovieList.on(MOVIE_LIST_ERROR, (event: CustomEvent<MovieErrorEventData>) => {
      const { error } = event.detail;
      this.handleError(error);
    });
  }

  private clear() {
    this.messageContainer.textContent = '';
  }

  private handleError(error: Error) {
    MovieListContainer.hideListContainer();

    if (error instanceof HTTPError) {
      this.render(HTTP_ERROR_CODE[error.statusCode]);
    }
  }

  render(type: InvalidMessageType, message?: string) {
    const heading = INVALID_MESSAGE[type].HEADING;
    const template = `
      <h3>${typeof heading === 'function' && message ? heading(message) : heading}</h3>
      <p>${INVALID_MESSAGE[type].CONTENT}</p>`;

    this.messageContainer.insertAdjacentHTML('beforeend', template);
    this.messageContainer.classList.remove('hide');
  }
}

export default InvalidMessage.getInstance();
