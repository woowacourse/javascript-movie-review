import CustomElement from "../basic/CustomElement";
import SearchTitleBoss from "../../domain/SearchTitleBoss";
import MovieBoss from "../../domain/MovieBoss";
import { $ } from "../../util/dom";
import "./MovieList";
import "./MovieListSkeleton";

class MovieContainer extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    SearchTitleBoss.subscribe(this);
  }

  template() {
    return `
        <section class="item-view">
          <h2>지금 인기 있는 영화</h2>
          <movie-list></movie-list>
          <div id="end-page" hidden></div>
          <movie-list-skeleton></movie-list-skeleton>
        </section>
    `;
  }

  rerender(searchWord) {
    $(".item-view h2").innerText = `'${searchWord}' 검색 결과`;
  }

  setEvent() {
    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        MovieBoss.showMoreMovies();
      }
    });

    const endPage = $("#end-page");
    io.observe(endPage);
  }
}

customElements.define("movie-container", MovieContainer);

export default MovieContainer;
