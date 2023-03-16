import CustomElement from "../basic/CustomElement";
import "../movie/MovieItem";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
    MovieManager.initMovies();
  }

  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }

  rerender(movies, isShowMore) {
    const movieItemsTemplate = movies
      .map((movie) => {
        const { title, src, starRate } = movie;
        return `
      <movie-item title='${title}' vote_average=${starRate} src=${src}></movie-item>
      `;
      })
      .join("");

    isShowMore
      ? $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate)
      : ($(".item-list").innerHTML = movieItemsTemplate);
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
