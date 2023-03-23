import CustomComponent from "../abstracts/CustomComponent";
import LogoImg from "../../templates/logo.png";

export default class HeaderComponent extends CustomComponent {
  template() {
    return /*html*/ `
          <h1 class="header-logo"><img src=${LogoImg} alt="MovieList 로고" data-action='popular'/></h1>
          <div class="search-box">
            <input type="text" placeholder="검색" />
            <button class="search-button" data-action="search">검색</button>
          </div>
          <button type="button" class="search-button-wrapper" data-action="search_on">
            검색
          </button>
          <div class="hide-all" data-action="hide_search"></div>
        `;
  }
}

customElements.define("app-header", HeaderComponent);
