// MovieList.ts
import { fullMovieListTemplate, movieItemsTemplate } from "./movieListTemplate";
import Modal from "../Modal/index";
import modalContentTemplate from "../Modal/modalContentTemplate";
import Store, { State } from "../../store/store";
import { Movie } from "../../../types/movieList";

class MovieList {
  private $container: HTMLElement;
  private store: Store;
  private previousMoviesLength: number = 0;
  private previousQuery: string = "";

  constructor($container: HTMLElement, store: Store) {
    this.$container = $container;
    this.store = store;
    this.store.subscribe(this.render.bind(this));
    this.render(this.store.getState());
  }

  private render(state: State): void {
    if (!this.previousMoviesLength || state.query !== this.previousQuery) {
      this.$container.innerHTML = fullMovieListTemplate({
        movies: state.movies,
        query: state.query,
        searchedMoviesLength: state.searchedMoviesLength,
        loading: state.loading,
      });
      this.previousMoviesLength = state.movies.length;
      this.previousQuery = state.query;
    } else {
      if (state.movies.length > this.previousMoviesLength) {
        const ul = this.$container.querySelector(
          "ul#movie-list"
        ) as HTMLElement;
        const newMovies = state.movies.slice(this.previousMoviesLength);
        const newItemsHTML = movieItemsTemplate({
          movies: newMovies,
          loading: state.loading,
          query: state.query,
        });
        ul.insertAdjacentHTML("beforeend", newItemsHTML);
        this.previousMoviesLength = state.movies.length;
      }
    }
    this.removeSkeleton(state.loading);
    this.attachThumbnailLoadEvent(this.$container);
    this.attachMovieItemEvents(this.store, this.$container);
  }

  private removeSkeleton(loading: boolean): void {
    if (!loading) {
      const $ul = document.querySelector("#movie-list") as HTMLElement;
      if ($ul) {
        const $skeletons = $ul.querySelectorAll(".skeleton-item");
        $skeletons.forEach((s) => s.remove());
      }
    }
  }

  private attachThumbnailLoadEvent(
    container: HTMLElement | Document = document
  ): void {
    const thumbnails = container.querySelectorAll("img.thumbnail");
    thumbnails.forEach((img) => {
      if (!img.getAttribute("data-load-listener-attached")) {
        img.addEventListener("load", function (this: HTMLImageElement) {
          this.style.display = "block";
          if (
            this.previousElementSibling &&
            this.previousElementSibling.classList.contains("skeleton-thumbnail")
          ) {
            (this.previousElementSibling as HTMLElement).style.display = "none";
          }
        });
        img.setAttribute("data-load-listener-attached", "true");
      }
    });
  }

  private attachMovieItemEvents(store: Store, container: HTMLElement): void {
    const modal = new Modal(store, modalContentTemplate);
    const items = container.querySelectorAll("li[data-movie-id]");
    items.forEach((li) => {
      li.addEventListener("click", async () => {
        const movieIdStr = li.getAttribute("data-movie-id");
        if (movieIdStr) {
          // state.movies는 Movie[]이므로, 비교 시 느슨하게 타입을 비교함
          const state = store.getState();
          const movie = state.movies.find(
            (m: Movie) => m.id.toString() === movieIdStr
          );
          if (movie) {
            modal.open(movie.id);
          }
        }
      });
    });
  }
}

export default MovieList;
