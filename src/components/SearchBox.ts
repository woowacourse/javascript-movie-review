customElements.define(
  "search-box",
  class SearchBox extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
                <input type="text" placeholder="검색" />
                <button class="search-button">검색</button>
            `;
    }
  }
);
