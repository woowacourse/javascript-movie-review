interface Props {
  search: (params: string) => void;
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
    const searchForm = document.querySelector("form.search-bar");

    searchForm?.addEventListener("submit", (event) => {
      event.preventDefault();

      const inputElement = searchForm.querySelector("input");
      const params = inputElement?.value.trim();

      if (!params) return; // 빈 문자열 입력 시 무시

      this.#props.search(params);
    });
  }
}

export default SearchBar;
