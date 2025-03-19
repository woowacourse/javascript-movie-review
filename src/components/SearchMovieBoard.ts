import { Movie } from "../main";
import { isHTMLElement } from "../utils/typeGuards";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList from "./MovieList";

const BASE_URL = "https://api.themoviedb.org/3";
const MAX_PAGE = 500;
const LOAD_COUNT = 20;

interface Props {
  searchParams: string;
}

class SearchMovieBoard {
  #parentElement;
  #props;
  #page;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#page = 1;
    this.#render();
    this.#initMoreMoviesButton();
    this.#fetchAndRenderMovies();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container" style="padding-top: 100px">
          <h2>"${this.#props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'></ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  #initMoreMoviesButton() {
    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (isHTMLElement($moreMoviesButton))
      new MoreMoviesButton($moreMoviesButton, {
        refetchMovies: () => this.#refetchMovies(),
      });
  }

  async #fetchAndRenderMovies() {
    const movies = await this.#fetchMovies();
    console.log(movies);
    this.#renderMovies(movies);
  }

  #renderMovies(movies: Movie[]) {
    const ul = document.querySelector(".thumbnail-list");
    ul?.insertAdjacentHTML("beforeend", MovieList(movies));
  }

  async #fetchMovies() {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        Authorization: `Bearer ${import.meta.env.VITE_TMDB_ACCESS_TOKEN}`,
      },
    };

    const raw = await fetch(
      `${BASE_URL}/search/movie?query=${
        this.#props.searchParams
      }&include_adult=false&language=en-US&page=${this.#page}`,
      options
    );
    const data = await raw.json();
    const movies: Movie[] = data.results;

    return movies;
  }

  async #refetchMovies() {
    this.#page += 1;
    const newMovies = await this.#fetchMovies();
    this.#renderMovies(newMovies);

    if (newMovies.length < LOAD_COUNT || this.#page >= MAX_PAGE) {
      this.#removeMoreMoviesButton();
      return;
    }
  }

  #removeMoreMoviesButton() {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default SearchMovieBoard;
