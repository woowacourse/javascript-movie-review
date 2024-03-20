import { createElement } from "../../utility/dom";

const MoreMoviesButton = {
  createMoreMoviesButton() {
    const button = createElement("button", {
      type: "button",
      class: "btn primary full-width",
    });
    button.textContent = "더보기";

    return button;
  },
};

export default MoreMoviesButton;
