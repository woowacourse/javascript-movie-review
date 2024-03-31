import "./style.css";

import createElement from "../../utils/createElement";
import DOMController from "../../DOMController";

const createSearchBox = (placeHolder: string) => {
  const searchForm = createElement({
    tagName: "form",
    attrs: { class: "search-box" },
  });
  const input = createElement({
    tagName: "input",
    attrs: {
      type: "text",
      placeholder: placeHolder,
    },
  }) as HTMLInputElement;

  input.required = true;
  const button = createElement({
    tagName: "button",
    attrs: { class: "search-button" },
  });

  searchForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const keyword = input.value;

    DOMController.renderSearchMoviePosterBoard(keyword);

    input.textContent = "";
  });

  searchForm.append(input, button);

  return searchForm;
};

export default createSearchBox;
