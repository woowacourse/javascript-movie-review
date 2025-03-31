import MessageModal from "../component/MessageModal";
import mainElement from "../dom/mainElement";
import { $ } from "../util/selector";

class MessageModalView {
  #modalElement: HTMLDialogElement;

  constructor() {
    this.#modalElement = MessageModal("") as HTMLDialogElement;
    this.#render();
    this.#bindEvents();
  }

  #render() {
    mainElement.insertAdjacentElement("afterend", this.#modalElement);
  }

  #bindEvents() {
    this.#modalElement.addEventListener("click", (e) => {
      if (e.target === e.currentTarget) this.close();
    });

    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        this.close();
      }
    });
  }

  updateText(text: string) {
    const spanElement = $("span", this.#modalElement);
    if (spanElement) spanElement.innerText = text;
  }

  show() {
    this.#modalElement.classList.add("active");
  }

  close() {
    this.#modalElement.classList.remove("active");
  }
}

export default MessageModalView;
