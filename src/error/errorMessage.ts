import './style.css';

const errorMessage = {
  apiError(statusCode: number, message?: string) {
    const movieItems = document.querySelector('.item-view') as HTMLElement;
    if (statusCode >= 500) {
      this.renderTemplates(movieItems, this.serverError());
    } else if (statusCode >= 400) {
      this.renderTemplates(movieItems, this.clientError());
    } else {
      this.renderTemplates(movieItems, this.noSearchedMovieError(message));
    }
  },

  serverError() {
    const templates = /* html */ `
      <h2 class="error-msg">서버 에러가 발생했습니다.</h2>
      <h2 class="error-msg">잠시 후 다시 이용해주세요.</h2>
    `;
    return templates;
  },

  clientError() {
    const templates = /* html */ `
      <h2 class="error-msg">에러가 발생했습니다.</h2>
      <h2 class="error-msg">잠시 후 다시 이용해주세요.</h2>
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
