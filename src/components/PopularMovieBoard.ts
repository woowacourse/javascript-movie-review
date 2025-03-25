import MovieApi from "../api/MovieApi";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";
import MoreMoviesButton from "./MoreMoviesButton";
import MovieList from "./MovieList";
import TopRatedMovie from "./TopRatedMovie";

class PopularMovieBoard {
  private static readonly MAX_PAGE = 500;

  #parentElement;
  #page;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#page = 1;
    this.#renderInitialLayout();
    this.#fetchAndRenderMovies();
  }

  #renderInitialLayout(): void {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="top-rated-container">
        ${
          new TopRatedMovie({
            id: 0,
            title: "로딩중...",
            vote_average: 0,
            poster_path: "",
          }).skeleton
        }
      </section>
      <section class="movie-list-container">
          <h2>지금 인기 있는 영화</h2>
          <ul class='thumbnail-list'>${new MovieList([]).skeleton}</ul>
          <div class="more-button-container"></div>
      </section>
    `;
  }

  async #fetchAndRenderMovies(): Promise<void> {
    const { movies } = await this.#movieData();
    if (!movies) return;

    this.#renderTopRatedMovie(movies[0]);
    this.#renderMovies(movies);
    this.#renderMoreMoviesButton();
  }

  #renderTopRatedMovie(movie: Movie): void {
    const $topRated = document.querySelector(".top-rated-container");
    if (isHTMLElement($topRated))
      $topRated.innerHTML = new TopRatedMovie(movie).ui;
  }

  #renderMovies(movies: Movie[]): void {
    const ul = document.querySelector(".thumbnail-list");
    if (!isHTMLElement(ul)) return;

    if (this.#page === 1) {
      ul.innerHTML = new MovieList(movies).ui;
      return;
    }
    ul?.insertAdjacentHTML("beforeend", new MovieList(movies).ui);
  }

  async #movieData(): Promise<{ movies: Movie[]; total_pages: number }> {
    try {
      const { movies, total_pages } = await MovieApi.fetchPopularMovies(
        this.#page
      );

      return { movies, total_pages };
    } catch (e) {
      new ErrorScreen("오류가 발생했습니다.").render();

      return { movies: [], total_pages: 0 };
    }
  }

  async #loadMoreMovies(): Promise<void> {
    this.#page += 1;
    console.log("load");

    const { movies: newMovies, total_pages } = await this.#movieData();
    if (!newMovies) return;

    this.#renderMovies(newMovies);

    if (this.#page >= PopularMovieBoard.MAX_PAGE || this.#page >= total_pages) {
      this.#hideMoreMoviesButton();
    }
  }

  #renderMoreMoviesButton(): void {
    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (!isHTMLElement($moreMoviesButton)) return;

    new MoreMoviesButton($moreMoviesButton, {
      refetchMovies: () => this.#loadMoreMovies(),
    });
  }

  #hideMoreMoviesButton(): void {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default PopularMovieBoard;
