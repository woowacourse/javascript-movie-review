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
      this.showMovieList();
    });

    $(".search-text").addEventListener("keyup", (e) => {
      if (e.key === "Enter") {
        this.showMovieList();
      }
    });
  }

  showMovieList() {
    const query = $(".search-text").value.trim();

    if (!query) {
      $(".search-text").value = "";
      return;
    }

    MovieManager.showSkeleton();
    MovieManager.showMovies(query);
  }
}

customElements.define("search-input", SearchInput);

export default SearchInput;
