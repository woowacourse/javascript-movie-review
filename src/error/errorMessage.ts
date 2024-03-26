import './style.css';
import DOM from '../utils/DOM';

const { $ } = DOM;

const errorMessage = {
  apiError(statusCode: number, message?: string) {
    const movieItems = document.querySelector('main') as HTMLElement;
    if (statusCode >= 500) {
      this.renderTemplates(movieItems, this.serverError(statusCode));
    } else if (statusCode >= 400) {
      this.renderTemplates(movieItems, this.clientError(statusCode));
    } else {
      this.renderTemplates(movieItems, this.noSearchedMovieError(message));
    }
  },

  serverError(statusCode: number) {
    const templates = /* html */ `
    <h1 class="error-msg">${statusCode}</h1>
    <h2 class="error-description">서버 에러입니다ㅠ <span onClick="window.location.reload()">새로고침</span> 해보고 안되면 알아서 처리하세요~</h2>
    `;
    return templates;
  },

  clientError(statusCode: number) {
    const templates = /* html */ `
      <h1 class="error-msg">${statusCode}</h1>
      <h2 class="error-description">클라이언트 에러입니다ㅠ <span onClick="window.location.reload()">새로고침</span> 해보고 안되면 알아서 처리하세요~</h2>
      `;
    return templates;
  },

  noSearchedMovieError(message?: string) {
    const templates = /* html */ `
      <h1 class="search-error-msg">${message}</h1>
      `;

    return templates;
  },

  renderTemplates(movieItems: HTMLElement, templates: string) {
    movieItems?.replaceChildren();
    movieItems?.insertAdjacentHTML('beforeend', templates);
  },
};

export default errorMessage;
