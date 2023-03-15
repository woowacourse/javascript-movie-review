import CustomElement from "../basic/CustomElement";
import "./SearchInput";
import { $ } from "../../util/dom";

class MovieHeader extends CustomElement {
  template() {
    return `
      <h1><img src="./image/logo.png" alt="MovieList logo" /></h1>
      <search-input class="search-box"></search-input>  
    `;
  }

  setEvent() {
    $("h1").addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("movie-head", MovieHeader);

export default MovieHeader;
