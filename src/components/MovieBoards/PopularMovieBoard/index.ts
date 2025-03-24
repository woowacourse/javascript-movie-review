import { createApi } from "../../../api/ApiFactory";
import { Movie } from "../../../types/movie";
import { isHTMLElement } from "../../../utils/typeGuards";
import ErrorScreen from "../@shared/ErrorScreen";
import MoreMoviesButton from "../@shared/MoreMoviesButton";
import MovieList from "../@shared/MovieList";
import TopRatedMovie from "./TopRatedMovie";

class PopularMovieBoard {
  private static readonly MAX_PAGE = 500;

  #parentElement: HTMLElement;
  #page;
  #api;
  #moreMoviesButton: MoreMoviesButton | null = null;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#page = 1;

    const errorRenderer = () =>
      new ErrorScreen("오류가 발생했습니다.").render();
    this.#api = createApi(errorRenderer);

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
    this.#initMoreMoviesButton();
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
      const data = await this.#api.fetchPopularMovies(this.#page);
      return {
        movies: data.results,
        total_pages: data.total_pages,
      };
    } catch (e) {
      console.log(e);
      return { movies: [], total_pages: 0 };
    }
  }

  async #loadMoreMovies(): Promise<void> {
    this.#moreMoviesButton?.setLoading(true);
    this.#page += 1;
    const { movies: newMovies, total_pages } = await this.#movieData();
    if (!newMovies) return;

    this.#moreMoviesButton?.setLoading(false);
    this.#renderMovies(newMovies);

    if (this.#page >= PopularMovieBoard.MAX_PAGE || this.#page >= total_pages) {
      this.#hideMoreMoviesButton();
      return;
    }
  }

  #initMoreMoviesButton(): void {
    const $moreMoviesButton = document.querySelector(".more-button-container");
    if (!isHTMLElement($moreMoviesButton)) return;

    this.#moreMoviesButton = new MoreMoviesButton($moreMoviesButton, {
      refetchMovies: () => this.#loadMoreMovies(),
    });
  }

  #hideMoreMoviesButton(): void {
    document.querySelector(".more-movies-button")?.remove();
  }
}

export default PopularMovieBoard;
