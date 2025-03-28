import { fullMovieListTemplate, movieItemsTemplate } from "./movieListTemplate";
import Modal from "../Modal";
import modalContentTemplate from "../Modal/modalContentTemplate";
import Store, { State } from "../../store/store";
import { Movie } from "../../../types/movieList";
import { appendHTMLs, renderTemplate } from "../../utils/templateUtils";

class MovieList {
  private $container: HTMLElement;
  private store: Store;
  private prevMoviesLength = 0;
  private prevQuery = "";

  constructor($container: HTMLElement, store: Store) {
    this.$container = $container;
    this.store = store;
    this.store.subscribe(this.render.bind(this));
    this.render(this.store.getState());
  }

  private render(state: State): void {
    const $ul = this.$container.querySelector("ul#movie-list") as HTMLElement;

    if (!this.prevMoviesLength || state.query !== this.prevQuery) {
      renderTemplate(
        this.$container,
        fullMovieListTemplate(state.movies, state.query)
      );
      this.prevMoviesLength = state.movies.length;
      this.prevQuery = state.query;
    } else if (state.movies.length > this.prevMoviesLength) {
      const newMovies = state.movies.slice(this.prevMoviesLength);
      appendHTMLs($ul, movieItemsTemplate(newMovies, state.query));
      this.prevMoviesLength = state.movies.length;
    }

    if (!state.loading && $ul) {
      $ul.querySelectorAll(".skeleton-item").forEach(($li) => $li.remove());
    }
    this.attachThumbnailLoadEvent(this.$container);
    this.attachMovieItemEvents(state);
  }

  private attachThumbnailLoadEvent($container: HTMLElement): void {
    $container.querySelectorAll("img.thumbnail").forEach(($img) => {
      if (!$img.getAttribute("data-load-listener-attached")) {
        $img.addEventListener("load", function (this: HTMLImageElement) {
          this.style.display = "block";
          const $prev = this.previousElementSibling as HTMLElement;
          if ($prev && $prev.classList.contains("skeleton-thumbnail")) {
            $prev.style.display = "none";
          }
        });
        $img.setAttribute("data-load-listener-attached", "true");
      }
    });
  }

  private attachMovieItemEvents(state: State): void {
    const $modal = new Modal(this.store, modalContentTemplate);
    this.$container.querySelectorAll("li[data-movie-id]").forEach(($li) => {
      $li.addEventListener("click", () => {
        const movieIdString = $li.getAttribute("data-movie-id");
        const movie = state.movies.find(
          (movie: Movie) => movie.id.toString() === movieIdString
        );
        if (movie) $modal.open(movie.id);
      });
    });
  }
}

export default MovieList;
