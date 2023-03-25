import { onSubmitSearchBox, onClickLogo, onClickMobileSearchButtonOpen, mobileSearchInputEnterListener, mobileSearchButtonListener } from "./headerHandler";

export default class HeaderMobile extends HTMLElement {
  constructor() {
    super();
    this.render();

    mobileSearchInputEnterListener();
    mobileSearchButtonListener();
    onClickLogo();
    onClickMobileSearchButtonOpen();
  }

  render() {
    this.innerHTML = `
    <header id="header-mobile" class="d-flex justify-content-between">
      <div id="logo-mobile">
        <h1><img id="logo" src="./assets/logo.png" alt="MovieList 로고" /></h1>
      </div>
      
      <div id="search-form-mobile" class="search-box d-flex justify-content-between">
        <input id="search-input-mobile" type="text" placeholder="검색" name="search-bar" class="display-none w-100"/>
        <button id="search-button-mobile" class="search-button">검색</button>
      </div>
    </header>
    `;
  }
}
