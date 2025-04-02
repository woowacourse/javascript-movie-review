import { fullMovieListTemplate, movieItemsTemplate } from "./movieListTemplate";
import Modal from "../Modal";
import Store, { State } from "../../store/store";
import { Movie } from "../../../types/movieList";
import { appendHTMLs, renderTemplate } from "../../ui/dom";

class MovieList {
  private $container: HTMLElement;
  private store: Store;
  private $modal: Modal;
  private prevMoviesLength = 0;
  private prevQuery = "";

  constructor($container: HTMLElement, store: Store, $modal: Modal) {
    this.$container = $container;
    this.store = store;
    this.$modal = $modal;
    this.store.subscribe(this.render.bind(this));
    this.render(this.store.getState());
  }

  private render(state: State): void {
    const $ul = this.$container.querySelector<HTMLElement>("#movie-list")!;

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
    this.$container.querySelectorAll("li[data-movie-id]").forEach(($li) => {
      if (!$li.getAttribute("data-listener-attached")) {
        $li.addEventListener("click", () => {
          const movieIdString = $li.getAttribute("data-movie-id");
          const movie = state.movies.find(
            (movie: Movie) => movie.id.toString() === movieIdString
          );
          if (movie) this.$modal.open(movie.id);
        });
        $li.setAttribute("data-listener-attached", "true");
      }
    });
  }
}

export default MovieList;
