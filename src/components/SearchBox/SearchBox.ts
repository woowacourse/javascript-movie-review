import "./style.css";

import createElement from "../../utils/createElement";

class SearchBox {
  element = createElement<HTMLFormElement>("form", {
    attrs: { class: "search-box" },
  });

  #input;

  #searchButton = this.#createSearchButton();

  constructor(option?: {
    placeHolder?: string;
    searchFunc?: (string: string) => void;
  }) {
    const { placeHolder = "검색", searchFunc = (string: string) => {} } =
      option ?? {};

    this.#input = this.#createInput(placeHolder);

    this.#setEvent(searchFunc);

    this.element.append(this.#input, this.#searchButton);
  }

  reset() {
    this.#input.value = "";
  }

  #createInput(placeHolder: string) {
    return createElement<HTMLInputElement>("input", {
      attrs: {
        type: "text",
        placeholder: placeHolder,
        required: "",
      },
    });
  }

  #createSearchButton() {
    const button = createElement<HTMLButtonElement>("button", {
      attrs: { class: "search-button" },
    });

    return button;
  }

  #setEvent(searchFunc: (string: string) => void) {
    this.element.addEventListener("submit", (event: Event) => {
      event.preventDefault();
      searchFunc(this.#input.value);
    });

    this.element.addEventListener("click", () => {
      this.element.classList.add("clicked");
    });

    document.addEventListener("click", (e: Event) => {
      if (
        e.target === this.element ||
        e.target === this.#input ||
        e.target === this.#searchButton
      )
        return;

      this.element.classList.remove("clicked");
    });
  }
}

export default SearchBox;
