import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";

class SearchInput extends CustomElement {
  template() {
    return `
      <form class="search-box">
        <label>
          <input type="text" class="search-text" placeholder="검색" />
          <button class="search-button">검색</button>
        </label>
      </form>
      `;
  }

  setEvent() {
    $(".search-box").addEventListener("submit", (e) => {
      e.preventDefault();
      this.showMovieList();
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
