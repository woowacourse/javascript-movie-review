import { ERROR_MESSAGE } from '../../constants/errorMessage';

interface ErrorResultOption {
  errorMessage: string;
}

class ErrorMessage {
  #container;
  #errorMessage;

  constructor({ errorMessage }: ErrorResultOption) {
    this.#container = document.createElement('div');
    this.#container.classList.add('empty-result');
    this.#errorMessage = errorMessage;

    this.render();
  }

  render() {
    this.#container.innerHTML =
      `
    <img src="https://h0ngju.github.io/javascript-movie-review/no-result.png" alt="으아아 행성이"/>
    <p class="text-subtitle">${this.#errorMessage}</p>
  ` +
      (this.#errorMessage === ERROR_MESSAGE.NO_RESULT
        ? `
        <p class="text-body check-text">✅ 단어의 철자가 정확한지 확인해 보세요.</p>
        <p class="text-body check-text">✅ 검색어의 단어 수를 줄이거나, 보다 일반적인 검색어로 다시 검색해 보세요.</p>
        <p class="text-body check-text">✅ 두 단어 이상의 검색어인 경우, 띄어쓰기를 확인해 보세요.</p>`
        : '');
  }

  get element() {
    return this.#container;
  }
}

export default ErrorMessage;
