import { Logo } from "../../images";

customElements.define(
  "movie-header",
  class MovieHeader extends HTMLElement {
    constructor() {
      super();

      this.innerHTML = /* html */ `
        <header>
        <h1><img src="${Logo}" alt="MovieList" /></h1>
        <search-box class="search-box"></search-box>
      </header>`;
    }
  }
);
