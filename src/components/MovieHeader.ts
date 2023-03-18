import { Logo } from "../../images";

class MovieHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
    <header>
    <h1><img src="${Logo}" alt="MovieList" /></h1>
    <search-box class="search-box"></search-box>
  </header>`;
  }
}

customElements.define("movie-header", MovieHeader);
