import { KEYWORD } from "../constants/keyword";
import { $ } from "../utils/selector";

export default class SearchBox {
  private _keyword: string;

  constructor() {
    this.render();
    this.handleEvent();
    this._keyword = KEYWORD.BLANK;
  }

  create() {
    return `
          <input type="text" placeholder="검색" class="search-input"/>
          <img class="search-button" src="/search_button.png"/>
        `;
  }

  render() {
    const searchBox = document.createElement("div");

    searchBox.classList.add("search-box");
    searchBox.innerHTML = this.create();
    $("header")?.appendChild(searchBox);
  }

  handleEvent() {
    const searchInput = $(".search-input");
    const searchButton = $(".search-button");
    const searchBox = $(".search-box");

    searchInput?.addEventListener("keyup", (e: any) => {
      this.updateKeyword(e.target.value);
      e.keyCode === 13 && this.onCompleteSearch(e);
    });
    searchButton?.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;

      if (target.parentElement?.clientWidth === 30) {
        searchBox?.classList.add("clicked");
        searchInput?.classList.add("clicked");
        return;
      }

      this.onCompleteSearch(e);
    });
  }

  onCompleteSearch(e: Event) {
    const event = new CustomEvent("completeInput");
    const searchInput = $(".search-input") as HTMLInputElement;

    searchInput.dispatchEvent(event);
  }

  updateKeyword(newWord: string) {
    this._keyword = newWord;
  }

  getKeyword() {
    return this._keyword;
  }

  resetInput() {
    const inputBox = $(".search-input") as HTMLInputElement;
    inputBox.value = KEYWORD.BLANK;
  }
}
