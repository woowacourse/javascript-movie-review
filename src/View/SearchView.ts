interface SearchViewDomType {
  form: HTMLFormElement | null;
  input: HTMLInputElement | null;
}

class SearchView {
  #dom: SearchViewDomType;

  constructor() {
    this.#dom = {
      form: document.querySelector(".search"),
      input: document.querySelector(".search-input"),
    };
  }

  bindEvent(handler: () => void) {
    this.#dom.form!.addEventListener("submit", async (e) => {
      e.preventDefault();

      await handler();
    });
  }

  getInputValue() {
    return this.#dom.input!.value;
  }
}

export default SearchView;
