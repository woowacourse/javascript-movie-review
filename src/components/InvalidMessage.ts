import HTTPError from '../api/HTTPError';
import { MOVIE_LIST_ERROR } from '../constants';
import {
  HTTP_ERROR_CODE,
  INVALID_JSON_RESPONSE,
  INVALID_MESSAGE,
} from '../constants/invalidMessage';
import { InvalidMessageType } from '../types/ui';
import { $ } from '../utils/domSelector';
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
    MovieList.on('movieListReset', () => {
      this.clear();
    });

    MovieList.on(MOVIE_LIST_ERROR, (event) => {
      const { error } = (event as CustomEvent).detail;
      this.handleError(error);
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

  private clear() {
    this.messageContainer.textContent = '';
  }

  private handleError(error: Error) {
    MovieListContainer.hideListContainer();

    if (error instanceof HTTPError) {
      this.render(HTTP_ERROR_CODE[error.statusCode]);
      return;
    }

    if (error.message === INVALID_JSON_RESPONSE) {
      this.render(INVALID_JSON_RESPONSE);
      return;
    }

    alert(error.message);
  }
}

export default InvalidMessage.getInstance();
