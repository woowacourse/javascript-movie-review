import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieBoss from "../../domain/MovieBoss";
import "../movie/MovieItem";
import "./MovieEmpty";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieBoss.subscribe(this);
    MovieBoss.initMovies();
  }

  template() {
    return `
    <ul class="item-list"></ul>
    `;
  }

  rerender(movies, isShowMore) {
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
        const { title, src, voteAverage, id, detail, genre_ids } = movie;
        return `
          <movie-item id=${id} title='${title}' vote_average=${voteAverage} src=${src} detail='${detail}' genre_ids=${genre_ids}>
          </movie-item>
          `;
      })
      .join("");
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
