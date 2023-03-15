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
      const movieName = this.querySelector("input").value;
      this.dispatchEvent(
        new CustomEvent("search-movie", { bubbles: true, detail: movieName })
      );
    });
  }
}

customElements.define("movie-search", MovieSearch);
