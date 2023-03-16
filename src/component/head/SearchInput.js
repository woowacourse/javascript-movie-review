import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";

class SearchInput extends CustomElement {
  template() {
    return `
      <input type="text" class="search-text" placeholder="검색" />
      <button class="search-button">검색</button>
    `;
  }

  setEvent() {
    $(".search-button").addEventListener("click", () => {
      const query = $(".search-text").value;
      this.searchMovie(query);
    });

    $(".search-text").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        const query = $(".search-text").value;
        this.searchMovie(query);
      }
    });
  }

  searchMovie(query) {
    MovieManager.searchMovies(query);
  }
}

customElements.define("search-input", SearchInput);

export default SearchInput;
