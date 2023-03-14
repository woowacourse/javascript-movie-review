import { $ } from "../util/dom";
import CustomElement from "./basic/CustomElement";

class Header extends CustomElement {
  template() {
    return `
    <header>
        <h1><img src="./image/logo.png" alt="MovieList logo" /></h1>
      </header>
    `;
  }

  setEvent() {
    $("h1").addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("movie-header", Header);

export default Header;
/* <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div> */
