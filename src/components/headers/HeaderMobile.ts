import { onSubmitSearchBox, onClickLogo } from "./headerHandler";

export default class HeaderMobile extends HTMLElement {
  constructor() {
    super();
    this.render();

    onSubmitSearchBox();
    onClickLogo();
  }

  render() {
    this.innerHTML = `
    <header class="d-flex justify-content-between">
      <div>
        <h1><img id="logo" src="./assets/logo.png" alt="MovieList 로고" /></h1>
      </div>
      <form id="search-bar" class="search-box">
        <input type="text" placeholder="모바일검색" name="search-bar"/>
        <button class="search-button">검색</button>
      </form>
    </header>
    `;
  }
}
