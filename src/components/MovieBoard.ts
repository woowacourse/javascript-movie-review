import { Movie } from "../main";
import { isHTMLElement } from "../utils/typeGuards";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList from "./MovieList";

export const BASE_URL = "https://api.themoviedb.org/3/movie";

type MovieBoardType = "POPULAR" | "SEARCH_RESULT";

interface Props {
  type: MovieBoardType;
}

type CurrentBoard = {
  type: MovieBoardType;
  title: string;
  fetchUrl: (page: number) => string;
  maxPage?: number;
};

class MovieBoard {
  #parentElement;
  #page;
  #currentBoard: CurrentBoard;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#page = 1;
    this.#currentBoard = this.#initCurrentBoard(props.type);
    this.#render();
    this.#initMoreMoviesButton();
    this.#fetchAndRenderMovies();
  }

  #initCurrentBoard(type: Props["type"]) {
    if (type === "POPULAR") {
      return {
        type,
        title: "지금 인기 있는 영화",
        fetchUrl(page: number) {
          return `${BASE_URL}/popular?language=en-US&page=${page}`;
        },
        maxPage: 500,
      };
    } else {
      return {
        type,
        title: "검색 결과",
        fetchUrl(page: number) {
          return `${BASE_URL}/popular?language=en-US&page=${page}`;
        },
      };
    }
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
        <div class="top-rated"></div>
        <section>
            <h2>${this.#currentBoard.title}</h2>
            <ul class='thumbnail-list'></ul>
            <div class="more-button-container"></div>
        </section>
    `;
  }

  async #fetchAndRenderMovies() {
    const movies = await this.#fetchMovies();
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

    const raw = await fetch(this.#currentBoard.fetchUrl(this.#page), options);
    const data = await raw.json();
    const movies: Movie[] = data.results;

    return movies;
  }

  async #refetchMovies() {
    this.#page += 1;
    const newMovies = await this.#fetchMovies();
    this.#renderMovies(newMovies);

    if (
      this.#currentBoard.maxPage &&
      this.#page >= this.#currentBoard.maxPage
    ) {
      this.#removeMoreMoviesButton();
      return;
    }
  }

  #removeMoreMoviesButton() {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default MovieBoard;
