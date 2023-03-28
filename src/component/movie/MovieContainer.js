import CustomElement from "../basic/CustomElement";
import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import "./MovieList";
import "./MovieListSkeleton";
import "../modal/MovieItemModal";
import { apiStatus } from "../../constant/movieConstants";
import { getMatchString } from "../../util/regularExpression";

class MovieContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this.rerender.bind(this));
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

  rerender(state) {
    if (state.status === apiStatus.FAILURE) {
      this.replaceChildren();
      return;
    }

    const $movieContainerTitle = $(".movie-container-title");

    const currentSearchWord = getMatchString(
      $movieContainerTitle.innerText,
      /'(.*?)'/
    );
    const { searchWord } = state.data;

    if (currentSearchWord !== searchWord) {
      $movieContainerTitle.innerText = searchWord
        ? `'${searchWord}' 검색 결과`
        : "지금 인기 있는 영화";
    }
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
