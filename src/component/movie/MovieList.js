import CustomElement from "../basic/CustomElement";
import MovieProcess from "../../domain/MovieProcess";
import { $, $$ } from "../../util/dom";
import "./MovieItem";
import "./MovieEmpty";

class MovieList extends CustomElement {
  #io;
  connectedCallback() {
    super.connectedCallback();
    MovieProcess.subscribe(this);
    MovieProcess.initMovies().then(() => {
      const last = this.observeLastItem();
      if (last) this.#io.observe(last);
    });
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
        const { title, src, voteAverage, id } = movie;
        return `
          <movie-item id=${id} title='${title}' vote_average=${voteAverage} src=${src}>
          </movie-item>
          `;
      })
      .join("");
  }

  setEvent() {
    this.#io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.#io.unobserve(entries[0].target);
        setTimeout(() => {
          MovieProcess.showMoreMovies();
          const endItem = this.observeLastItem();
          this.#io.observe(endItem);
        }, 1000);
      }
    });
  }

  observeLastItem() {
    const items = $$("movie-item");
    const endItem = items[items.length - 1];
    return endItem;
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
