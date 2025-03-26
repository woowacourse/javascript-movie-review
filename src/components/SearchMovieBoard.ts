import MovieApi from "../api/MovieApi";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";
import MovieList, { movieListSkeleton } from "./MovieList";

interface Props {
  searchParams: string;
}

class SearchMovieBoard {
  private static readonly LOAD_COUNT = 20;
  #parentElement;
  #props;
  #page;
  #isLoading: boolean = false;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#page = 1;

    this.#renderInitialLayout();
    this.#fetchAndRenderMovies();
    this.#addEventListeners();
  }

  #renderInitialLayout(): void {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container search-movie-list-container">
          <h2>"${this.#props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'>${movieListSkeleton()}</ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  async #fetchAndRenderMovies(): Promise<void> {
    const { movies } = await this.#movieData();

    if (movies.length === 0) {
      window.removeEventListener("scroll", this.#handleScroll);
      this.#renderNoResult();
      return;
    }

    this.#renderMovies(movies);
    if (movies.length < SearchMovieBoard.LOAD_COUNT) return;
  }

  #renderMovies(movies: Movie[]): void {
    const ul = document.querySelector(".thumbnail-list");
    if (!isHTMLElement(ul)) return;

    if (this.#page === 1) {
      ul.innerHTML = "";
      new MovieList(ul, movies);
      return;
    }

    new MovieList(ul, movies);
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
    if (this.#isLoading) return;
    this.#isLoading = true;

    this.#page += 1;

    const { movies: newMovies, total_pages } = await this.#movieData();

    this.#renderMovies(newMovies);

    this.#isLoading = false;

    if (
      newMovies.length < SearchMovieBoard.LOAD_COUNT ||
      this.#page >= total_pages
    ) {
      window.removeEventListener("scroll", this.#handleScroll);
    }
  }

  #handleScroll = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.body.scrollHeight;

    if (scrollTop + windowHeight >= documentHeight - 100) {
      this.#loadMoreMovies();
    }
  };

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

  destroy(): void {
    window.removeEventListener("scroll", this.#handleScroll);
  }

  #addEventListeners(): void {
    window.addEventListener("scroll", this.#handleScroll);
  }
}

export default SearchMovieBoard;
