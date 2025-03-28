import { selectElement } from "../utils/dom.ts";

class Modal {
  #element;

  constructor() {
    this.#element = this.create();
    this.setEvent();
  }

  create() {
    const template = /*html*/ `
    <div class="modal-background" id="modalBackground">
      <div class="modal" id="modal">
        <button class="close-modal" id="closeModal">
          <img src="./images/modal_button_close.png" />
        </button>
      </div>
    </div>
    `;

    const body = selectElement<HTMLBodyElement>("body");
    body.insertAdjacentHTML("beforeend", template);

    return selectElement<HTMLDivElement>("#modal");
  }

  open(contents: HTMLDivElement) {
    const prevContents = this.#element.querySelector(".modal-container");
    if (prevContents) {
      prevContents.remove();
    }

    this.#element.insertAdjacentElement("beforeend", contents);

    const modalBackground = selectElement<HTMLDivElement>("#modalBackground");
    modalBackground.classList.add("active");
  }

  #close() {
    const modalBackground = selectElement<HTMLDivElement>("#modalBackground");
    modalBackground.classList.remove("active");
  }

  #onClickCloseButton() {
    const closeModalButton = selectElement<HTMLButtonElement>("#closeModal");
    closeModalButton.addEventListener("click", this.#close);
  }

  #onClickBackground() {
    const handleBackdropClick = (event: Event) => {
      const target = event.target as HTMLDivElement;

      if (target.closest("#modalBackground") && !target.closest(".modal")) {
        this.#close();
      }
    };

    const modalBackground = selectElement<HTMLDivElement>("#modalBackground");
    modalBackground.addEventListener("click", handleBackdropClick);
  }

  #onKeydownEscape() {
    const handleEscapeKeydown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        this.#close();
      }
    };

    document.addEventListener("keydown", handleEscapeKeydown);
  }

  setEvent() {
    this.#onClickCloseButton();
    this.#onClickBackground();
    this.#onKeydownEscape();
  }
}

export default Modal;
