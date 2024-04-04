import "./style.css";

import Modal from "../Modal/Modal";
import createElement from "../../utils/createElement";

class HeaderModal extends Modal {
  protected titleElement = createElement("h2", {
    attrs: { class: "modal--title" },
  });
  constructor(option?: {
    contents?: (string | HTMLElement)[];
    isOpen?: boolean;
    title?: string;
  }) {
    super(option);
    const header = this.#createHeader({
      title: option?.title,
    });
    this.container.prepend(header);
  }

  setTitle(title: string) {
    this.titleElement.textContent = title;
  }

  #createHeader(option?: { title?: string }) {
    const { title } = option ?? {};
    const header = createElement("header", {
      attrs: { class: "modal--header" },
    });

    if (title) this.setTitle(title);

    const closeButton = this.#createCloseButton();

    header.append(this.titleElement, closeButton);

    return header;
  }

  #createCloseButton() {
    const closeButton = createElement<HTMLButtonElement>("button", {
      attrs: { class: "modal--close-button" },
      content: "X",
    });

    closeButton.addEventListener("click", this.close.bind(this));

    return closeButton;
  }
}

export default HeaderModal;
