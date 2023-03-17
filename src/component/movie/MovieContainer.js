import CustomElement from "../basic/CustomElement";
import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import "./MovieList";
import "./ShowMoreButton";
import "./MovieListSkeleton";

class MovieContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
  }

  template() {
    return `
        <section class="item-view">
          <h2 class='movie-container-title'></h2>
          <movie-list></movie-list>
          <movie-list-skeleton></movie-list-skeleton>
          <show-more-button></show-more-button>
        </section>
    `;
  }

  rerender({ searchWord }) {
    $(".movie-container-title").innerText = searchWord
      ? `'${searchWord}'검색 결과`
      : "지금 인기 있는 영화";
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
