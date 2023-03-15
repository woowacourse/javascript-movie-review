import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";
import "./SearchInput";

class MovieHeader extends CustomElement {
  template() {
    return `
    <header>
        <h1><img src="./image/logo.png" alt="MovieList logo" /></h1>
        <search-input class='search-box'/>  
    </header>
    `;
  }

  setEvent() {
    $("h1").addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("movie-header", MovieHeader);

export default MovieHeader;
