import { ERROR_2XX, ERROR_4XX, ERROR_5XX } from '../constants';

export default class ErrorRender {
  #errorPageElement = document.createElement('div');

  #status: string = '';

  constructor(status: string) {
    this.#status = status;
    this.#errorPageElement.id = 'error-page';
    const itemView = document.querySelector('.item-view');

    if (itemView) {
      itemView.appendChild(this.#errorPageElement);
    }
  }

  renderError() {
    if (this.#status[0] === ERROR_2XX) this.#renderNoResult();
    if (this.#status[0] === ERROR_4XX) this.#renderClientError();
    if (this.#status[0] === ERROR_5XX) this.#renderServerError();
  }

  #renderNoResult() {
    this.#errorPageElement.innerHTML = '<h2>검색 결과가 없습니다.</h2>';
  }

  #renderClientError() {
    this.#errorPageElement.innerHTML = '<h2>클라이언트 에러</h2>';
  }

  #renderServerError() {
    this.#errorPageElement.innerHTML = '<h2>서버 에러</h2>';
  }
}
