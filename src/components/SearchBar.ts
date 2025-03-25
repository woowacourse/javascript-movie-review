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

      this.#disableButton();
      this.#props.onSearchSubmitted(params);
      this.#enableButton();
    });
  }

  #disableButton() {
    const moreButton = document.querySelector(".search-button");
    moreButton?.setAttribute("disabled", "true");
  }

  #enableButton() {
    const moreButton = document.querySelector(".search-button");
    moreButton?.removeAttribute("disabled");
  }
}

export default SearchBar;
