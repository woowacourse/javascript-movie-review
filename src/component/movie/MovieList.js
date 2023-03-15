import CustomElement from "../basic/CustomElement";
import "../movie/MovieItem";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
    MovieManager.publish();
  }

  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }

  rerender({ list }) {
    const movieItemsTemplate = list
      .map((movie) => {
        const { title, src, starRate } = movie;
        return `
      <movie-item title='${title}' vote_average=${starRate} src=${src}></movie-item>
      `;
      })
      .join("");

    $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate);
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
