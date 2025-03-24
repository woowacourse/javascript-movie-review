interface ErrorResultOption {
  errorMessage: string;
}

class ErrorMessage {
  #container;
  #errorMessage;

  constructor({ errorMessage }: ErrorResultOption) {
    this.#container = document.createElement('div');
    this.#container.classList.add('error-message');
    this.#errorMessage = errorMessage;

    this.render();
  }

  render() {
    this.#container.innerHTML = `
        <img src="./no-result.png" alt="으아아 행성이"/>
        <p class="error-message__detail text-subtitle">${this.#errorMessage}</p>
    `;
  }

  get element() {
    return this.#container;
  }
}

export default ErrorMessage;
