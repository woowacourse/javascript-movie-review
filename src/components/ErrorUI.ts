import { selectElement } from "../utils/ui";
import TextButton from "./TextButton";

interface ErrorUIParams {
  status?: number;
  message: string;
}

class ErrorUI {
  #status;
  #message;
  #element;

  constructor({ status, message }: ErrorUIParams) {
    this.#status = status ?? null;
    this.#message = message;
    this.#element = document.createElement("div");
    this.#element.classList.add("error-box-container");
  }

  create() {
    const template = /*html*/ `
      <h2 class="error-status">${this.#status ?? ""}</h2>
      <p class="error-message">${this.#message}</p>
    `;

    this.#element.insertAdjacentHTML("beforeend", template);
    this.createButton();
  }

  createButton() {
    const button = new TextButton({
      id: "redirect-route-button",
      title: "메인 페이지로 돌아가기",
      type: "primary",
      onClick: this.#handleClickRoutingHome.bind(this),
    }).create();

    this.#element.insertAdjacentElement("beforeend", button);
  }

  #handleClickRoutingHome() {
    window.location.reload();
  }

  renderError() {
    const main = selectElement<HTMLElement>("main");
    const target = selectElement<HTMLFormElement>("#search-container");

    main.replaceChildren();
    target.remove();
    main.insertAdjacentElement("beforeend", this.#element);
  }
}

export default ErrorUI;
