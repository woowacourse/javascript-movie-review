const NO_SEARCH_RESULT_STATUS = '2';
const CLIENT_ERROR = '4';
const SERVER_ERROR = '5';

export default class UserNotifyPage {
  #userNotifyPageElement = document.createElement('div');

  #status: string = '';

  constructor(status: string) {
    this.#status = status;
    this.#userNotifyPageElement.id = 'error-page';
    const itemView = document.querySelector('.item-view');

    if (itemView) {
      itemView.appendChild(this.#userNotifyPageElement);
    }
  }

  renderError() {
    if (this.#status[0] === NO_SEARCH_RESULT_STATUS) this.#renderNoResult();
    if (this.#status[0] === CLIENT_ERROR) this.#renderClientError();
    if (this.#status[0] === SERVER_ERROR) this.#renderServerError();
  }

  #renderNoResult() {
    this.#userNotifyPageElement.innerHTML = '<h2>검색 결과가 없습니다.</h2>';
  }

  #renderClientError() {
    this.#userNotifyPageElement.innerHTML = '<h2>클라이언트 에러</h2>';
  }

  #renderServerError() {
    this.#userNotifyPageElement.innerHTML = '<h2>서버 에러</h2>';
  }
}
