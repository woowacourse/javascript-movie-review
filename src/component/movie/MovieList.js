import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";
import "../movie/MovieItem";
import "./MovieEmpty";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
  }

  template() {
    return `
    <ul class="item-list"></ul>
    <div class="list-footer"></div>
    `;
  }

  setEvent() {
    const observer = new IntersectionObserver((entries) => {
      const $listFooter = entries[0];

      if ($listFooter.isIntersecting) {
        MovieManager.showMoreMovies();
      }
    });

    const $listFooter = $(".list-footer");
    observer.observe($listFooter);
  }

  rerender({ movies, isShowMore, page, totalPages }) {
    const movieItemsTemplate = movies.length
      ? this.makeMovieItems(movies)
      : this.makeEmptyItem();

    isShowMore
      ? $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate)
      : ($(".item-list").innerHTML = movieItemsTemplate);

    $(".list-footer").hidden = page === totalPages ? true : false;
  }

  makeMovieItems(movies) {
    return movies
      .map((movie) => {
        const { title, src, starRate } = movie;
        return `
          <movie-item title='${title}' vote_average=${starRate} src=${src}>
          </movie-item>
          `;
      })
      .join("");
  }

  makeEmptyItem() {
    return `<movie-empty></movie-empty>`;
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
