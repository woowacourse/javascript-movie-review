import CustomElement from "../basic/CustomElement";
import { IMG } from "../../abstract/constants";
import "./SearchInput";

class MovieHeader extends CustomElement {
  template() {
    return `
      <a href=".">
        <h1><img src=${IMG.LOGO} alt="MovieList logo" /></h1>
      </a>
        <search-input class="search-box"></search-input>  
    `;
  }
}

customElements.define("movie-head", MovieHeader);

export default MovieHeader;
