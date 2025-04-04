import MovieApi from "../api/MovieApi";
import ScrollManeger from "../events/ScrollManager";
import { Movie } from "../types/movie";
import { isHTMLElement } from "../utils/typeGuards";
import ErrorScreen from "./ErrorScreen";
import MovieList from "./MovieList";
import TopRatedMovie from "./TopRatedMovie";

class PopularMovieBoard {
  private static readonly MAX_PAGE = 500;
  #parentElement;
  #MovieList!: MovieList;
  #TopRatedMovie!: TopRatedMovie;
  #ScrollManager!: ScrollManeger;
  #page;
  #isLoading: boolean = false;

  constructor(parentElement: HTMLElement) {
    this.#parentElement = parentElement;
    this.#page = 1;
    this.#renderInitialLayout();
    window.scrollTo(0, 0);
    this.#initComponents();
    this.#fetchAndRenderMovies();
  }

  #renderInitialLayout(): void {
    this.#parentElement.innerHTML = /*html*/ `
      <section class="top-rated-container">
      </section>
      <section class="movie-list-container">
          <h2>지금 인기 있는 영화</h2>
          <ul class='thumbnail-list'></ul>
          <div class="scroll-sentinel" style="height: 1px;"></div> 
      </section>
    `;
  }

  #initComponents(): void {
    const $thumbnailList = this.#parentElement.querySelector(".thumbnail-list");
    const $topRatedContainer = this.#parentElement.querySelector(
      ".top-rated-container"
    );

    if (isHTMLElement($thumbnailList))
      this.#MovieList = new MovieList($thumbnailList);

    if (isHTMLElement($topRatedContainer))
      this.#TopRatedMovie = new TopRatedMovie($topRatedContainer);
  }

  async #fetchAndRenderMovies(): Promise<void> {
    this.#showLoading();

    const { movies } = await this.#movieData();
    if (!movies) return;

    this.#renderTopRatedMovie(movies[0]);
    this.#renderMovies(movies);
    this.#addEventListeners();
  }

  #showLoading(): void {
    this.#MovieList.render({ status: "loading" });
    this.#TopRatedMovie.render({ status: "loading" });
  }

  #renderTopRatedMovie(movie: Movie): void {
    this.#TopRatedMovie.render({ status: "success", data: movie });
  }

  #renderMovies(movies: Movie[]): void {
    if (this.#page === 1) {
      this.#MovieList.init();
      this.#MovieList.render({ status: "success", data: movies });
      return;
    }

    this.#MovieList.render({ status: "success", data: movies });
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
    if (this.#isLoading) return;
    this.#isLoading = true;

    this.#page += 1;

    const { movies: newMovies, total_pages } = await this.#movieData();

    this.#renderMovies(newMovies);

    this.#isLoading = false;

    if (this.#page >= PopularMovieBoard.MAX_PAGE || this.#page >= total_pages) {
      this.destroy();
    }
  }

  destroy(): void {
    this.#ScrollManager.stop();
  }

  #addEventListeners(): void {
    const $sentinel = this.#parentElement.querySelector(".scroll-sentinel");
    if (!isHTMLElement($sentinel)) return;

    this.#ScrollManager = new ScrollManeger({
      target: $sentinel,
      threshold: 150,
      callback: () => this.#loadMoreMovies(),
    });
    this.#ScrollManager.start();
  }
}

export default PopularMovieBoard;
