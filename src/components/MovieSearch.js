export default class MovieSearch extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
         <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
         </div>
        `;
    this.initEventHandler();
  }

  initEventHandler() {
    this.querySelector(".search-button").addEventListener("click", () => {
      this.dispatchEvent(new CustomEvent("search-movie", { bubbles: true }));
    });
  }
}

customElements.define("movie-search", MovieSearch);
