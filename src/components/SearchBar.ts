interface Props {
  search: () => void;
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
        <button>
          <img src="./images/search_button.png" />
        </button>
    </form >
  `;
  }

  #addEventListeners() {
    const moreButton = document.querySelector("form.search-bar");
    moreButton?.addEventListener("click", () => this.#props.search());
  }
}

export default SearchBar;
