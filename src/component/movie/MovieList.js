import CustomElement from "../basic/CustomElement";
import { $ } from "../../util/dom";
import MovieManager from "../../domain/MovieManager";
import "../movie/MovieItem";
import "./MovieEmpty";
import { apiStatus } from "../../constant/movieConstants";

class MovieList extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this.rerender.bind(this));
  }

  template() {
    return `
    <ul class="item-list"></ul>
    <div class="list-footer" hidden></div>
    `;
  }

  setEvent() {
    this.setScrollEvent();
    this.setModalOpenEvent();
  }

  rerender(state) {
    if (state.status === apiStatus.SUCCESS && state.data.movies) {
      const { isShowMore, movies, page, totalPages } = state.data;

      const movieItemsTemplate = movies.length
        ? this.makeMovieItems(movies)
        : this.makeEmptyItem();

      isShowMore
        ? $(".item-list").insertAdjacentHTML("beforeend", movieItemsTemplate)
        : ($(".item-list").innerHTML = movieItemsTemplate);

      $(".list-footer").hidden = page === totalPages;
    }
  }

  makeMovieItems(movies) {
    return movies
      .map((movie) => {
        const { title, src, starRate, id } = movie;
        return `
          <movie-item data-id=${id} title='${title}' vote_average=${starRate} src=${src}>
          </movie-item>
          `;
      })
      .join("");
  }

  makeEmptyItem() {
    return `<movie-empty></movie-empty>`;
  }

  setScrollEvent() {
    const observer = new IntersectionObserver((entries) => {
      const $listFooter = entries[0];

      if ($listFooter.isIntersecting) {
        MovieManager.showMoreMovies();
      }
    });

    const $listFooter = $(".list-footer");
    observer.observe($listFooter);
  }

  setModalOpenEvent() {
    $(".item-list").addEventListener("click", (e) => {
      const movieId = e.target.closest("movie-item")?.dataset.id;

      if (movieId) {
        MovieManager.openItemModal(Number(movieId));
      }
    });
  }
}

customElements.define("movie-list", MovieList);

export default MovieList;
