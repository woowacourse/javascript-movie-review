import CustomElement from "@/basic/CustomElement";
import "@/component/movie/MovieList";
import { $ } from "../../util/dom";

class MovieContainer extends CustomElement {
  template() {
    return `
        <section class="item-view">
          <h2 class='movie-container-title'>지금 인기 있는 영화</h2>
          <movie-list />
        </section>
    `;
  }

  rerender(searchWord) {
    $(".movie-container-title").innerText = `'${searchWord}' 검색 결과`;
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
