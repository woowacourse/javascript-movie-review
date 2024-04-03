import './style.css';
import DOM from '../../utils/DOM';
import errorHandler from '../../utils/errorHandler';

const { $ } = DOM;

const errorDisplay = {
  displayError(statusCode: number, message?: string) {
    const movieItems = $('main') as HTMLElement;
    const errorMessageTemplate = this.getErrorMessageTemplate(statusCode, message);
    this.renderTemplates(movieItems, errorMessageTemplate);
  },

  getErrorMessageTemplate(statusCode: number, message?: string) {
    const errorText = this.getErrorText(statusCode);
    if (statusCode >= 400) return this.serverAndClientErrorTemplate(statusCode, errorText);
    return this.noSearchedMovieErrorTemplate(message!, errorText);
  },

  serverAndClientErrorTemplate(statusCode: number, errorText: string) {
    const templates = /* html */ `
          <div class="error-container">
            <h1 class="error-msg">${statusCode}</h1>
            <h2>${errorText} ${errorHandler(statusCode)}<h2>
            <h2><button onClick="window.location.reload()">새로고침</button> 해보거나 네트워크 상태를 확인해보세요.</h2>
            <h2>그래도 안 되면 알아서 처리하세요~❤️</h2>
          </div>
          `;
    return templates;
  },

  noSearchedMovieErrorTemplate(message: string, errorText: string) {
    const templates = /* html */ `
        <div class="error-container search-error">
          <div>${message}</div>
          <h2>${errorText}</h2>
        </div>
          `;

    return templates;
  },

  getErrorText(statusCode: number) {
    if (statusCode >= 500) {
      return '서버 에러입니다.';
    }
    if (statusCode >= 400) {
      return '클라이언트 에러입니다.';
    }
    return '검색어를 바르게 입력하셨는지 확인해주세요~❤️';
  },

  renderTemplates(movieItems: HTMLElement, templates: string) {
    movieItems?.replaceChildren();
    movieItems?.insertAdjacentHTML('beforeend', templates);
  },
};

export default errorDisplay;
