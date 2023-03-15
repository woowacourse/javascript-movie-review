export default class MovieHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
  <header>
    <h1>MovieList</h1>
    <movie-search></movie-search>
  </header>`;
  }
}

customElements.define("movie-header", MovieHeader);
