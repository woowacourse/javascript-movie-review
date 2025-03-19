import { Movie } from "../main";
import { isHTMLElement } from "../utils/typeGuards";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList, { MovieListSkeleton } from "./MovieList";
import TopRatedMovie, { TopRatedMovieSkeleton } from "./TopRatedMovie";

export const BASE_URL = "https://api.themoviedb.org/3/movie";
const MAX_PAGE = 500;

class PopularMovieBoard {
  #parentElement;
  #page;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#page = 1;
    this.#render();
    this.#fetchAndRenderMovies();
  }

  #initMoreMoviesButton() {
    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (isHTMLElement($moreMoviesButton))
      new MoreMoviesButton($moreMoviesButton, {
        refetchMovies: () => this.#refetchMovies(),
      });
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="top-rated-container">
        ${TopRatedMovieSkeleton()}
      </section>
      <section class="movie-list-container">
          <h2>지금 인기 있는 영화</h2>
          <ul class='thumbnail-list'>${MovieListSkeleton()}</ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  async #fetchAndRenderMovies() {
    const movies = await this.#fetchedMovies();
    if (!movies) return;

    const $topRated = document.querySelector(".top-rated-container");
    if (isHTMLElement($topRated))
      $topRated.innerHTML = TopRatedMovie(movies[0]);

    this.#renderMovies(movies);
    this.#initMoreMoviesButton();
  }

  #renderMovies(movies: Movie[]) {
    const ul = document.querySelector(".thumbnail-list");

    if (!isHTMLElement(ul)) return;

    if (this.#page === 1) {
      ul.innerHTML = MovieList(movies);
      return;
    }
    ul?.insertAdjacentHTML("beforeend", MovieList(movies));
  }

  async #fetchedMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };
    try {
      const raw = await fetch(
        `${BASE_URL}/popular?language=en-US&page=${this.#page}`,
        options
      );
      const data = await raw.json();
      const movies: Movie[] = data.results;
      return movies;
    } catch (e) {
      const $main = document.querySelector("main");
      if (!isHTMLElement($main)) return;

      $main.innerHTML = `<div class="fallback-screen" style="min-height:500px; ">
        <img src="./images/dizzy_planet.png"/>
        <p>오류가 발생했습니다</p>
      </div>`;
    }
  }

  async #refetchMovies() {
    this.#page += 1;
    const newMovies = await this.#fetchedMovies();
    if (!newMovies) return;

    this.#renderMovies(newMovies);

    if (this.#page >= MAX_PAGE) {
      this.#removeMoreMoviesButton();
      return;
    }
  }

  #removeMoreMoviesButton() {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default PopularMovieBoard;
