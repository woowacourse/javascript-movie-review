import { isHTMLElement } from "../utils/typeGuards";

interface Props {
  onSearchSubmitted: (params: string) => void;
}

class SearchBar {
  #parentElement;
  #props;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#render();
    this.#addEventListeners();
  }

  #render() {
    this.#parentElement.innerHTML = `
    <form class="search-bar">
        <input placeholder="검색어를 입력하세요"/>
        <button class="search-button" type="submit">
          <img src="./images/search_button.png" alt="search-button"/>
        </button>
    </form >
  `;
  }

  #addEventListeners() {
    const searchForm = document.querySelector("form.search-bar");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputElement = searchForm.querySelector("input");
      const params = inputElement?.value.trim();

      if (!params) return; // 빈 문자열 입력 시 무시

      this.#disableForm();
      this.#props.onSearchSubmitted(params);
      this.#enableForm();
    });
  }

  #disableForm() {
    const moreButton = document.querySelector(".search-button");
    const inputElement = document.querySelector("input");

    if (isHTMLElement(moreButton)) moreButton.setAttribute("disabled", "true");
    if (isHTMLElement(inputElement))
      inputElement.setAttribute("disabled", "true");
  }

  #enableForm() {
    const moreButton = document.querySelector(".search-button");
    const inputElement = document.querySelector("input");

    if (isHTMLElement(moreButton)) moreButton.removeAttribute("disabled");
    if (isHTMLElement(inputElement)) inputElement.removeAttribute("disabled");
  }
}

export default SearchBar;
