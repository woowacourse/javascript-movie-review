import Footer from "./components/Footer";
import Header from "./components/Header";
import MoreMoviesButton from "./components/MoreMoviesButton";
import MovieList from "./components/MovieList";
import { isHTMLElement } from "./utils/typeGuards";

export interface Movie {
  id: number;
  poster_path: string;
  vote_average: number;
  title: string;
}

export const BASE_URL = "https://api.themoviedb.org/3/movie";
const MAX_PAGE = 500;

class App {
  #page: number;
  #movies: Movie[];

  constructor() {
    this.#page = 1;
    this.#movies = [];
    this.#initialSetup();
  }

  async #initialSetup() {
    const movies = await this.#fetchMovies(this.#page);
    this.#movies = movies;

    const $header = document.querySelector("header");
    if (isHTMLElement($header))
      new Header($header, { topRatedMovie: this.#movies[0] });

    this.#renderMoviesContainer();
    this.#renderMovies(movies);

    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (isHTMLElement($moreMoviesButton))
      new MoreMoviesButton($moreMoviesButton, {
        refetchMovies: () => this.#refetchMovies(),
      });

    this.#renderFooter();
  }

  async #refetchMovies() {
    this.#page += 1;
    const newMovies = await this.#fetchMovies(this.#page);
    this.#renderMovies(newMovies);

    if (this.#page >= MAX_PAGE) {
      this.#removeMoreMoviesButton();
      return;
    }
  }

  async #fetchMovies(page: number) {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };

    const raw = await fetch(
      `${BASE_URL}/popular?language=en-US&page=${page}`,
      options
    );
    const data = await raw.json();
    const movies: Movie[] = data.results;

    return movies;
  }

  #renderMoviesContainer() {
    const section = document.querySelector("main section");
    section?.insertAdjacentHTML(
      "afterbegin",
      "<h2>지금 인기 있는 영화</h2><ul class='thumbnail-list'></ul>"
    );
  }

  #renderMovies(movies: Movie[]) {
    const ul = document.querySelector(".thumbnail-list");
    ul?.insertAdjacentHTML("beforeend", MovieList(movies));
  }

  #renderFooter() {
    const root = document.querySelector("#wrap");
    root?.insertAdjacentHTML("beforeend", Footer());
  }

  #removeMoreMoviesButton() {
    document.querySelector(".more-movies-button")?.remove();
  }
}

new App();
