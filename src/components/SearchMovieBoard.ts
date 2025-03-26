import MovieApi from "../api/MovieApi";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList from "./MovieList";

interface Props {
  searchParams: string;
}

class SearchMovieBoard {
  private static readonly LOAD_COUNT = 20;

  #parentElement;
  #props;
  #page;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#page = 1;
    this.#renderInitialLayout();
    this.#fetchAndRenderMovies();
  }

  #renderInitialLayout(): void {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container search-movie-list-container">
          <h2>"${this.#props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'>${new MovieList([]).skeleton}</ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  async #fetchAndRenderMovies(): Promise<void> {
    const { movies } = await this.#movieData();

    if (movies.length === 0) {
      console.log("no result");
      this.#renderNoResult();
      return;
    }

    this.#renderMovies(movies);
    if (movies.length < SearchMovieBoard.LOAD_COUNT) return;
    this.#initMoreMoviesButton();
  }

  #renderMovies(movies: Movie[]): void {
    const ul = document.querySelector(".thumbnail-list");

    if (!isHTMLElement(ul)) return;

    if (this.#page === 1) {
      ul.innerHTML = new MovieList(movies).ui;
    } else {
      ul.insertAdjacentHTML("beforeend", new MovieList(movies).ui);
    }
  }

  async #movieData(): Promise<{ movies: Movie[]; total_pages: number }> {
    try {
      const { movies, total_pages } = await MovieApi.fetchSearchMovies(
        this.#page,
        this.#props.searchParams
      );

      return { movies, total_pages };
    } catch (e) {
      new ErrorScreen("오류가 발생했습니다.").render();

      return { movies: [], total_pages: 0 };
    }
  }

  async #loadMoreMovies(): Promise<void> {
    this.#page += 1;
    const { movies: newMovies, total_pages } = await this.#movieData();

    this.#renderMovies(newMovies);

    if (
      newMovies.length < SearchMovieBoard.LOAD_COUNT ||
      this.#page >= total_pages
    ) {
      this.#hideMoreMoviesButton();
    }
  }

  #renderNoResult() {
    const h2 = document.querySelector(".movie-list-container h2");
    const ul = document.querySelector("ul.thumbnail-list");

    if (isHTMLElement(ul)) ul.innerHTML = "";

    if (isHTMLElement(h2))
      h2.insertAdjacentHTML(
        "afterend",
        `<div class="fallback-screen">
            <img src="./images/dizzy_planet.png" alt="dizzy-planet"/>
            <p>검색 결과가 없습니다</p>
        </div>`
      );
  }

  #initMoreMoviesButton(): void {
    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (isHTMLElement($moreMoviesButton))
      new MoreMoviesButton($moreMoviesButton, {
        refetchMovies: () => this.#loadMoreMovies(),
      });
  }

  #hideMoreMoviesButton(): void {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default SearchMovieBoard;
