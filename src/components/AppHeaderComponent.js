import CustomComponent from "../abstracts/CustomComponent";
import LogoImg from "../../templates/logo.png";

export default class HeaderComponent extends CustomComponent {
  template() {
    return `
          <h1><img src=${LogoImg} alt="MovieList 로고" data-action='popular'/></h1>
          <div class="search-box">
            <input type="text" placeholder="검색" />
            <button class="search-button" data-action="search">검색</button>
          </div>
        `;
  }
}

customElements.define("app-header", HeaderComponent);
