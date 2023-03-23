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
    <div class="list-footer" hidden></div>
    `;
  }

  setEvent() {
    this.scrollDown();
    this.openItemModal();
  }

  rerender({ movies, isShowMore, page, totalPages }) {
    const movieItemsTemplate = movies.length
      ? this.makeMovieItems(movies)
      : this.makeEmptyItem();

    isShowMore
      ? $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate)
      : ($(".item-list").innerHTML = movieItemsTemplate);

    $(".list-footer").hidden = page === totalPages;
  }

  makeMovieItems(movies) {
    return movies
      .map((movie) => {
        const { title, src, starRate, id } = movie;
        return `
          <movie-item id=${id} title='${title}' vote_average=${starRate} src=${src}>
          </movie-item>
          `;
      })
      .join("");
  }

  makeEmptyItem() {
    return `<movie-empty></movie-empty>`;
  }

  scrollDown() {
    const observer = new IntersectionObserver((entries) => {
      const $listFooter = entries[0];

      if ($listFooter.isIntersecting) {
        MovieManager.showMoreMovies();
      }
    });

    const $listFooter = $(".list-footer");
    observer.observe($listFooter);
  }

  openItemModal() {
    $(".item-list").addEventListener("click", (e) => {
      e.preventDefault();
      history.pushState({}, "", "#");

      const movieId = e.target.closest("movie-item")?.id;

      if (movieId) {
        MovieManager.openItemModal(Number(movieId));
      }
    });
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
