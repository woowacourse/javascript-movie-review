import { selectElement } from "../utils/dom.ts";

class Modal {
  #element;

  constructor() {
    this.#element = this.create();
  }

  create() {
    const template = /*html*/ `
    <div class="modal-background active" id="modalBackground">
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

  open() {
    const modalBackground = selectElement<HTMLDivElement>("#modalBackground");
    modalBackground.classList.add("active");
  }

  renderContents(contents: HTMLDivElement) {
    this.#element.insertAdjacentElement("beforeend", contents);
  }
}

export default Modal;
