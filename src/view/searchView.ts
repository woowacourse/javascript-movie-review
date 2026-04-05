class SearchView {
  #form: HTMLElement | null;
  #input: HTMLInputElement | null;
  #addButton: HTMLButtonElement | null;
  #bannerContainer: HTMLElement | null;
  #thumbnailTitle: HTMLElement | null;
  #headerBar: HTMLElement | null;

  constructor() {
    this.#form = document.querySelector("#search-form");
    this.#input = document.querySelector("#search-input");
    this.#addButton = document.querySelector("#add-button");
    this.#bannerContainer = document.querySelector(".background-container");
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

  showAddButton() {
    if (this.#addButton) {
      this.#addButton.style.display = "block";
    }
  };

  hideBanner() {
    if (this.#bannerContainer) {
      this.#bannerContainer.style.display = "none";
    }
  };

  updateThumbnailTitle(searchValue: string) {
    if (this.#thumbnailTitle) {
      this.#thumbnailTitle.textContent = `"${searchValue}" 검색 결과`;
    }
  };

  headerBarPositionRelative() {
    if (this.#headerBar) {
      this.#headerBar.style.position = "relative";
    }
  };
}

export const searchView = new SearchView();
