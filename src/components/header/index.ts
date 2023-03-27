import { initSearchBox, initLogo } from "./headerHandler";

export default class Header extends HTMLElement {
  constructor() {
    super();
    this.render();

    initSearchBox();
    initLogo();
  }

  render() {
    this.insertAdjacentHTML(
      "beforeend",
      `
        <header>
          <h1>
            <img class="logo" src="./assets/logo.png" alt="MovieList 로고" />
            <button class="logo none-display"><i class="bi bi-house-fill"></i></button>
          </h1>
          <form id="search-bar" class="search-box">
            <input type="text" placeholder="검색" name="search-bar" class="search-input"/>
            <button class="search-button">검색</button>
          </form>
        </header>
      `
    );
  }
}
