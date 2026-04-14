import { getElementOrThrow } from "./utils";

interface SearchViewDomType {
  form: HTMLFormElement;
  input: HTMLInputElement;
}

class SearchView {
  #dom: SearchViewDomType;

  constructor() {
    this.#dom = {
      form: getElementOrThrow<HTMLFormElement>(".search"),
      input: getElementOrThrow<HTMLInputElement>(".search-input"),
    };
  }

  bindEvent(handler: () => void) {
    this.#dom.form.addEventListener("submit", (e) => {
      e.preventDefault();

      handler();
    });
  }

  getInputValue() {
    return this.#dom.input.value;
  }
}

export default SearchView;
