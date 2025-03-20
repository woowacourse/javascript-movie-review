import { isHTMLElement } from "../utils/typeGuards";

interface ErrorScreenContract {
  render: () => void;
}

class ErrorScreen implements ErrorScreenContract {
  #message: string;

  constructor(message: string) {
    this.#message = message;
  }

  public render() {
    const $main = document.querySelector("main");
    if (!isHTMLElement($main)) return;

    $main.innerHTML = /*html*/ `<div class="fallback-screen">
        <img src="./images/dizzy_planet.png"/>
        <p>${this.#message}</p>
      </div>`;
  }
}

export default ErrorScreen;
