import "./style.css";

import createElement from "../../utils/createElement";

class CloseButton {
  buttonElement: HTMLElement;

  constructor(onClickFunc?: (event: Event) => void) {
    this.buttonElement = createElement({
      tagName: "button",
      attrs: {
        class: "close-button",
      },
    });

    const contentDiv = createElement({
      tagName: "div",
      contents: "x",
      attrs: {
        class: "close-button-x",
      },
    });

    if (onClickFunc) this.buttonElement.addEventListener("click", onClickFunc);
    this.buttonElement.append(contentDiv);
  }

  get element() {
    return this.buttonElement;
  }
}

export default CloseButton;
