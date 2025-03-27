import {
  fullMovieListTemplate,
  movieItemsTemplate,
} from "./movieListTemplate.js";
import Modal from "../Modal/index.js";
import modalContentTemplate from "../Modal/modalContentTemplate.js";

class MovieList {
  #$container;
  #store;
  #previousMoviesLength = 0;
  #previousQuery = "";

  constructor($container, store) {
    this.#$container = $container;
    this.#store = store;
    this.#store.subscribe(this.#render.bind(this));
    this.#render(this.#store.getState());
  }

  #render(state) {
    if (!this.#previousMoviesLength || state.query !== this.#previousQuery) {
      this.#$container.innerHTML = fullMovieListTemplate({
        movies: state.movies,
        query: state.query,
        searchedMoviesLength: state.searchedMoviesLength,
        loading: state.loading,
      });
      this.#previousMoviesLength = state.movies.length;
      this.#previousQuery = state.query;
    } else {
      if (state.movies.length > this.#previousMoviesLength) {
        const ul = this.#$container.querySelector("ul#movie-list");
        const newMovies = state.movies.slice(this.#previousMoviesLength);
        const newItemsHTML = movieItemsTemplate({
          movies: newMovies,
          loading: state.loading,
          query: state.query,
        });
        ul.insertAdjacentHTML("beforeend", newItemsHTML);
        this.#previousMoviesLength = state.movies.length;
      }
    }
    this.#removeSkeleton(state.loading);
    this.#attachThumbnailLoadEvent(this.#$container);
    this.#attachMovieItemEvents(this.#store, this.#$container);
  }

  #removeSkeleton(loading) {
    if (!loading) {
      const $ul = document.querySelector("#movie-list");
      const $skeletons = $ul.querySelectorAll(".skeleton-item");
      $skeletons.forEach((s) => s.remove());
    }
  }

  #attachThumbnailLoadEvent(container = document) {
    const thumbnails = container.querySelectorAll("img.thumbnail");
    thumbnails.forEach((img) => {
      if (!img.getAttribute("data-load-listener-attached")) {
        img.addEventListener("load", function () {
          this.style.display = "block";
          if (
            this.previousElementSibling &&
            this.previousElementSibling.classList.contains("skeleton-thumbnail")
          ) {
            this.previousElementSibling.style.display = "none";
          }
        });
        img.setAttribute("data-load-listener-attached", "true");
      }
    });
  }

  #attachMovieItemEvents(store, container) {
    const modal = new Modal(store, modalContentTemplate);
    const items = container.querySelectorAll("li[data-movie-id]");
    items.forEach((li) => {
      li.addEventListener("click", async () => {
        const movieId = li.getAttribute("data-movie-id");
        const state = store.getState();
        const movie = state.movies.find((m) => m.id == movieId);
        if (movie) {
          modal.open(movie.id);
        }
      });
    });
  }
}

export default MovieList;
