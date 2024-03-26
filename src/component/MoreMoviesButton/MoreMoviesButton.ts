import { createElement } from "../../utility/dom";

const MoreMoviesButton = {
  createMoreMoviesButton(tab: string) {
    const button = createElement("button", {
      type: "button",
      class: `btn primary full-width ${tab}MoreMoviesButton`,
    });
    button.textContent = "더보기";

    return button;
  },
};

export default MoreMoviesButton;
