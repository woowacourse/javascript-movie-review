import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieProcessor from "../../domain/MovieProcessor";

class SearchInput extends CustomElement {
  template() {
    return `
      <input type="text" class="search-text" placeholder="검색" />
      <button class="search-button">검색</button>
    `;
  }

  setEvent() {
    $(".search-button").addEventListener("click", () => {
      this.searchMovie();
    });

    $(".search-text").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.searchMovie();
      }
    });
  }

  searchMovie() {
    const query = $(".search-text").value.trim();

    if (!query) {
      $(".search-text").value = "";
      return;
    }
    MovieProcessor.searchMovies(query);
  }
}

customElements.define("search-input", SearchInput);

export default SearchInput;
