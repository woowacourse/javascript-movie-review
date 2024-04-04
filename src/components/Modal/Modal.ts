import "./style.css";

import createElement from "../../utils/createElement";

class Modal {
  element = createElement("div", { attrs: { class: "modal" } });
  protected container;
  protected contents = createElement("div");
  protected backdrop;
  protected closeAction;

  constructor(option?: {
    contents?: (string | HTMLElement)[];
    isOpen?: boolean;
    closeAction?: () => void;
  }) {
    const { contents = [], isOpen = true, closeAction } = option ?? {};
    this.backdrop = createElement("div", {
      attrs: { class: "modal-backdrop" },
    });
    this.container = createElement("aside", {
      attrs: { class: "modal-container" },
    });
    if (contents.length > 0) this.contents.append(...contents);
    this.container.append(this.contents);
    this.element.append(this.backdrop, this.container);
    if (isOpen) this.open();
    if (!isOpen) this.close();

    if (closeAction) this.closeAction = closeAction;

    this.#setEvent();
  }

  open() {
    this.element.classList.remove("display-none");
  }

  close() {
    this.element.classList.add("display-none");
    if (this.closeAction) this.closeAction();
  }

  replaceContents(...elements: HTMLElement[]) {
    this.contents.replaceChildren(...elements);
  }

  #setEvent() {
    this.backdrop.addEventListener("click", this.close.bind(this));
    document.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.close.call(this);
    });
  }
}

export default Modal;
