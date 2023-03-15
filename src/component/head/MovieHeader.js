import CustomElement from "../basic/CustomElement";
import "./SearchInput";
import { $ } from "../../util/dom";

class MovieHeader extends CustomElement {
  template() {
    return `
      <h1><img src="./image/logo.png" alt="MovieList logo" /></h1>
      <search-input class='search-box'/>  
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
