import { initSearchBox, initLogo } from "./headerHandler";

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.render();

    initSearchBox();
    initLogo();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1><img id="logo" src="../assets/logo.png" alt="MovieList 로고" /></h1>
      <form id="search-bar" class="search-box">
        <input type="text" placeholder="검색" name="search-bar"/>
        <button class="search-button">검색</button>
      </form>
    </header>
    `;
  }
}
