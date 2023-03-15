export default class MovieHeader extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ `
  <header>
    <h1>MovieList</h1>
    <div class="search-box">
      <input type="text" placeholder="검색" />
      <button class="search-button">검색</button>
    </div>
  </header>`;
  }
}

customElements.define("movie-header", MovieHeader);
