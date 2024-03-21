export default class ErrorPage {
  #errorPageElement = document.createElement('div');

  constructor() {
    this.#errorPageElement.id = 'error-page';
    this.#errorPageElement.innerHTML = '<h2>검색 결과가 없습니다.</h2>';
    this.#renderError();
  }

  #renderError() {
    const itemView = document.querySelector('.item-view');

    if (itemView) {
      itemView.appendChild(this.#errorPageElement);
    }
  }
}
