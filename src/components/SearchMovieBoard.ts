import MovieApi from "../api/MovieApi";
import ScrollManeger from "../events/ScrollManager";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";
import MovieList from "./MovieList";

interface Props {
  searchParams: string;
}

class SearchMovieBoard {
  private static readonly LOAD_COUNT = 20;
  #parentElement;
  #MovieList!: MovieList;
  #ScrollManager!: ScrollManeger;
  #props;
  #page;
  #isLoading: boolean = false;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#page = 1;
    this.#renderInitialLayout();
    window.scrollTo(0, 0);

    this.#initComponents();
    this.#fetchAndRenderMovies();
  }

  #renderInitialLayout(): void {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container search-movie-list-container">
          <h2>"${this.#props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'></ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  #initComponents(): void {
    const $thumbnailList = this.#parentElement.querySelector(".thumbnail-list");

    if (isHTMLElement($thumbnailList))
      this.#MovieList = new MovieList($thumbnailList);
  }

  async #fetchAndRenderMovies(): Promise<void> {
    this.#showLoading();

    const { movies } = await this.#movieData();

    if (movies.length === 0) {
      this.#ScrollManager.stop();
      this.#renderNoResult();
      return;
    }

    this.#renderMovies(movies);
    this.#addEventListeners();
    if (movies.length < SearchMovieBoard.LOAD_COUNT) return;
  }

  #showLoading(): void {
    this.#MovieList.render({ status: "loading" });
  }

  #renderMovies(movies: Movie[]): void {
    const ul = document.querySelector(".thumbnail-list");
    if (!isHTMLElement(ul)) return;
    
    if (this.#page === 1) {
      this.#MovieList.init();
      this.#MovieList.render({ status: "success", data: movies });
      return;
    }

    this.#MovieList.render({ status: "success", data: movies });
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
      this.#ScrollManager.stop();
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

  destroy(): void {
    this.#ScrollManager.stop();
  }

  #addEventListeners(): void {
    this.#ScrollManager = new ScrollManeger(() => this.#loadMoreMovies(), 150);
    this.#ScrollManager.start();
  }
}

export default SearchMovieBoard;
