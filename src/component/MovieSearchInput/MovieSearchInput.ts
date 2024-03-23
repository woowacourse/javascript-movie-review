import { createElement } from "../../utility/dom";

class MovieSearchInput {
  createSearchBox() {
    const form = createElement("form", {
      class: "search-box",
    });
    const input = createElement("input", {
      type: "text",
      placeholder: "검색",
      maxlength: "30",
    });
    const button = createElement("button", {
      class: "search-button",
    });
    button.textContent = "검색";

    form.appendChild(input);
    form.appendChild(button);

    return form;
  }
}

export default MovieSearchInput;
