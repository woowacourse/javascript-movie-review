class SearchView {
  #form: HTMLElement | null;
  #input: HTMLInputElement | null;
  #thumbnailTitle: HTMLElement | null;
  #headerBar: HTMLElement | null;

  constructor() {
    this.#form = document.querySelector("#search-form");
    this.#input = document.querySelector("#search-input");
    this.#thumbnailTitle = document.querySelector("#thumbnail-title");
    this.#headerBar = document.querySelector("#header-bar");
  }

  bindSearchSubmit(handler: (keyword: string) => void) {
    this.#form?.addEventListener("submit", (event) => {
      event.preventDefault();
      const keyword = this.#input?.value;
      if (keyword) {
        handler(keyword);
      } else {
        handler('');
      }
    })
  };

  changeToSearchMode(keyword: string) {
    this.updateThumbnailTitle(keyword);
    this.headerBarPositionRelative();
  };

  updateThumbnailTitle(searchValue: string) {
    if (this.#thumbnailTitle) this.#thumbnailTitle.textContent = `"${searchValue}" 검색 결과`;
  };

  headerBarPositionRelative() {
    if (this.#headerBar) this.#headerBar.style.position = "relative";
  };
}

export const searchView = new SearchView();
