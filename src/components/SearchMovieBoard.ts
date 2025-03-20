import { Movie } from "../main";
import { isHTMLElement } from "../utils/typeGuards";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList, { MovieListSkeleton } from "./MovieList";

const BASE_URL = "https://api.themoviedb.org/3";
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
    this.#fetchAndRenderMovies();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container" style="padding-top: 100px">
          <h2>"${this.#props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'>${MovieListSkeleton()}</ul>
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

  #renderNoResult() {
    const h2 = document.querySelector(".movie-list-container h2");
    const ul = document.querySelector("ul.thumbnail-list");

    if (isHTMLElement(ul)) ul.innerHTML = "";

    if (isHTMLElement(h2))
      h2.insertAdjacentHTML(
        "afterend",
        `<div class="fallback-screen">
            <img src="./images/dizzy_planet.png"/>
            <p>검색 결과가 없습니다</p>
        </div>`
      );
  }

  async #fetchAndRenderMovies() {
    const { movies } = await this.#fetchedMovies();

    if (movies.length === 0) {
      this.#renderNoResult();
      return;
    }

    this.#renderMovies(movies);

    if (movies.length < LOAD_COUNT) return;

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

    const raw = await fetch(
      `${BASE_URL}/search/movie?query=${
        this.#props.searchParams
      }&include_adult=false&language=en-US&page=${this.#page}`,
      options
    );
    const data = await raw.json();
    const movies: Movie[] = data.results;

    return { movies, total_pages: data.total_pages };
  }

  async #refetchMovies() {
    this.#page += 1;
    const { movies: newMovies, total_pages } = await this.#fetchedMovies();

    this.#renderMovies(newMovies);

    if (newMovies.length < LOAD_COUNT || this.#page >= total_pages) {
      this.#removeMoreMoviesButton();
    }
  }

  #removeMoreMoviesButton() {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default SearchMovieBoard;
