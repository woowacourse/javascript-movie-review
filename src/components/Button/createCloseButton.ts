import "./style.css";

import createElement from "../../utils/createElement";

const createCloseButton = (onClickFunc?: (event: Event) => void) => {
  const closeButton = createElement({
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

  if (onClickFunc) closeButton.addEventListener("click", onClickFunc);
  closeButton.append(contentDiv);

  return closeButton;
};

export default createCloseButton;
