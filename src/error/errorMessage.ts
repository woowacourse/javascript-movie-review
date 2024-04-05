import { ERROR_MESSAGE } from '../constants/errorMessage';
import './style.css';

const errorMessage = {
  apiError(statusCode: number, message?: string) {
    const movieItems = document.querySelector('.item-view') as HTMLElement;
    if (statusCode >= 500) {
      this.renderTemplates(movieItems, this.serverError());
    } else if (statusCode >= 400) {
      this.renderTemplates(movieItems, this.clientError());
    } else if (message) {
      this.renderTemplates(movieItems, this.noSearchedMovieError(message));
    }
  },

  serverError() {
    const templates = /* html */ `
      <h2 class="error-msg">${ERROR_MESSAGE.SERVER_ERROR}</h2>
    `;
    return templates;
  },

  clientError() {
    const templates = /* html */ `
      <h2 class="error-msg">${ERROR_MESSAGE.CLIENT_ERROR}</h2>
      `;
    return templates;
  },

  noSearchedMovieError(message?: string) {
    const templates = /* html */ `
      <h2 class="error-msg">${message}</h2>
      `;
    return templates;
  },

  renderTemplates(movieItems: HTMLElement, templates: string) {
    movieItems?.replaceChildren();
    movieItems?.insertAdjacentHTML('beforeend', templates);
  },
};

export default errorMessage;
