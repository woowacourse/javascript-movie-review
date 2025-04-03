import { createElement } from "../../util/dom";
import { $ } from "../../util/querySelector";

export default class Modal {
  #modalBackground;
  #modalContainer;
  #closeButton;
  #closeImg;

  constructor($content) {
    this.#modalBackground = this.#createModalBackground();
    this.#modalContainer = this.#createModalContainer();
    this.#closeButton = this.#createCloseButton();
    this.#closeImg = this.#createCloseImg();

    this.#createModal($content);
    this.#bindEvents();
    this.#mount();
  }

  replaceModalContent($newContent) {
    this.#modalContainer.innerHTML = "";

    this.#modalContainer.appendChild(this.#closeButton);
    this.#modalContainer.appendChild($newContent);
  }

  #createModal($content) {
    this.#closeButton.append(this.#closeImg);
    this.#modalContainer.append(this.#closeButton, $content);
    this.#modalBackground.append(this.#modalContainer);
  }

  #createModalBackground() {
    return createElement("div", {
      className: ["modal-background", "active"],
      id: "modalBackground",
    });
  }

  #createModalContainer() {
    return createElement("div", {
      className: "modal",
    });
  }

  #createCloseButton() {
    return createElement("button", {
      className: "close-modal",
      id: "closeModal",
    });
  }

  #createCloseImg() {
    return createElement("img", {
      src: "./images/modal_button_close.png",
    });
  }

  #bindEvents() {
    this.#bindBackgroundClick();
    this.#bindEscapeKey();
    this.#bindCloseButton();
  }

  #bindBackgroundClick() {
    this.#modalBackground.addEventListener("click", (e) => {
      if (e.target.id === "modalBackground") {
        this.#close();
      }
    });
  }

  #bindEscapeKey() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "Escape") {
        this.#close();
      }
    });
  }

  #bindCloseButton() {
    if (this.#closeButton) {
      this.#closeButton.addEventListener("click", () => this.#close());
    }
  }

  #close() {
    this.#modalBackground.remove();
  }

  #mount() {
    $("#wrap").append(this.#modalBackground);
  }
}
