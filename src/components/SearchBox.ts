class SearchBox {
  constructor() {
    this.render();
    this.handleEvent();
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
    const button = document.querySelector(".search-input");
    button?.addEventListener("keyup", (e: any) => {
      e.key === "Enter" && this.onKeyup(e);
    });
  }

  onKeyup(e: Event) {
    const target = e.target as HTMLInputElement;
    const event = new CustomEvent("searchButtonClicked", {
      detail: {
        query: target!.value,
      },
    });
    document.querySelector(".search-input")!.dispatchEvent(event);
  }
}

export default SearchBox;
