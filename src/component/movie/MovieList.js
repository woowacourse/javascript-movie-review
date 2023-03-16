import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";
import "../movie/MovieItem";
import "./MovieEmpty";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
    MovieManager.searchMovies();
  }

  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }

  rerender({ movies, isShowMore }) {
    const movieItemsTemplate = movies.length
      ? this.makeMovieItems(movies)
      : `<movie-empty></movie-empty>`;

    isShowMore
      ? $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate)
      : ($(".item-list").innerHTML = movieItemsTemplate);
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
}

customElements.define("movie-list", MovieList);

export default MovieList;
