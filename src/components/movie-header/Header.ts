import { onClickLogo, onClickSearchButton, onClickSearchFormTrigger, searchInputEnterListener } from "./headerHandler";

export default class Header extends HTMLElement {

  private static instance: Header;

  constructor() {
    super();
    this.render();
    onClickLogo();
    onClickSearchFormTrigger();
    onClickSearchButton();
    searchInputEnterListener();
  }

  public static getInstance(): Header {
    if (!Header.instance) {
      Header.instance = new Header();
    }

    return Header.instance;
  }

  render() {
    this.innerHTML = `
    <header id="header" class="d-flex justify-content-between">
      <div id="logo">
        <h1><img id="logo" src="./assets/logo.png" alt="MovieList 로고" /></h1>
      </div>
      
      <div id="search-box" class="search-box d-flex justify-content-between">
        <div id="search-form" class="search-box d-flex justify-content-between">
          <input
            id="search-input" 
            type="text" 
            placeholder="검색" 
            name="search-bar" 
            class=""
          />
          <button 
            id="search-button" 
            class="search-button"
          >
            검색
          </button>
        </div>
        <button id="search-form-trigger" class="search-button">검색</button>
      </div>
    </header>
    `;
  }
}
