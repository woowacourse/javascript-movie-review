import "./style.css";

import createElement from "../../utils/createElement";

class Modal {
  element = createElement("div", { attrs: { class: "modal" } });
  #container;
  #backdrop;
  constructor(option?: {
    contents?: (HTMLElement | string)[];
    isOpen?: boolean;
  }) {
    const { contents = [], isOpen = true } = option ?? {};
    this.#backdrop = createElement("div", {
      attrs: { class: "modal-backdrop" },
    });
    this.#container = createElement("aside", {
      attrs: { class: "modal-container" },
    });
    if (contents.length > 0) this.#container.append(...contents);
    this.element.append(this.#backdrop, this.#container);
    if (isOpen) this.open();
    if (!isOpen) this.close();

    this.#setEvent();
  }

  open() {
    this.element.classList.remove("display-none");
  }

  close() {
    this.element.classList.add("display-none");
  }

  #setEvent() {
    this.#backdrop.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.close.call(this);
    });
  }
}

export default Modal;
