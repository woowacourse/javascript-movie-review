import CustomComponent from "../abstracts/CustomComponent";
import LogoImg from "../../templates/logo.png";

export default class HeaderComponent extends CustomComponent {
  template() {
    return `
        <header>
            <h1><img src=${LogoImg} alt="MovieList 로고" /></h1>
            <div class="search-box">
            <input type="text" placeholder="검색" />
            <button class="search-button">검색</button>
            </div>
        </header>
        `;
  }
}

customElements.define("app-header", HeaderComponent);
