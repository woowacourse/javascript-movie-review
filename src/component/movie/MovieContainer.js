import CustomElement from "../basic/CustomElement";
import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import "./MovieList";
import "./MovieListSkeleton";
import "../modal/MovieItemModal";

class MovieContainer extends CustomElement {
  #searchWord = "";

  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
    MovieManager.showMovies();
  }

  template() {
    return `
        <section class="item-view">
          <h2 class='movie-container-title'>지금 인기 있는 영화</h2>
          <movie-list></movie-list>
          <movie-list-skeleton></movie-list-skeleton>
        </section>
        <movie-item-modal></movie-item-modal>
    `;
  }

  rerender({ searchWord }) {
    if (this.#searchWord !== searchWord) {
      this.#searchWord = searchWord;

      $(".movie-container-title").innerText = searchWord
        ? `'${searchWord}'검색 결과`
        : "지금 인기 있는 영화";
    }
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
