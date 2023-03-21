export default class SearchBox {
  private _keyword: string;

  constructor() {
    this.render();
    this.handleEvent();
    this._keyword = "";
  }

  create() {
    return `
          <input type="text" placeholder="검색" class="search-input"/>
          <button class="search-button">검색</button>
        `;
  }

  render() {
    const searchBox = document.createElement("div");

    searchBox.classList.add("search-box");
    searchBox.innerHTML = this.create();
    document.querySelector("header")?.appendChild(searchBox);
  }

  handleEvent() {
    const searchInput = document.querySelector(".search-input");

    searchInput?.addEventListener("keyup", (e: any) => {
      e.keyCode === 13 && this.onKeyup(e);
    });
  }

  onKeyup(e: Event) {
    const target = e.target as HTMLInputElement;
    const event = new CustomEvent("searchInputChange");
    const searchInput = document.querySelector(
      ".search-input"
    ) as HTMLInputElement;

    this.updateKeyword(target.value);
    searchInput.dispatchEvent(event);
  }

  updateKeyword(newWord: string) {
    this._keyword = newWord;
  }

  getKeyword() {
    return this._keyword;
  }
}
