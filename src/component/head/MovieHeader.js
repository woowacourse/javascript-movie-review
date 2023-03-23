import CustomElement from "../basic/CustomElement";
import "./SearchInput";
import "./MobileSearchButton";

class MovieHeader extends CustomElement {
  template() {
    return `
      <a href='.'>
        <h1> <img src="./image/logo.png" alt="MovieList logo" /></h1>
      </a>
      <search-input class="search-box"></search-input>
      <mobile-search-button></mobile-search-button>
      `;
  }
}

customElements.define("movie-head", MovieHeader);

export default MovieHeader;
