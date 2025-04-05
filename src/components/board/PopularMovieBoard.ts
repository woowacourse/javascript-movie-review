import MovieApi from "../../api/MovieApi";
import { Movie } from "../../types/movie";
import { isHTMLElement } from "../../utils/typeGuards";
import ErrorScreen from "../ErrorScreen";
import TopRatedMovie from "../TopRatedMovie";
import AbstractMovieBoard from "./AbstractMovieBoard";

class PopularMovieBoard extends AbstractMovieBoard {
  private static readonly MAX_PAGE = 500;
  protected TopRatedMovie!: TopRatedMovie;

  constructor(parentElement: HTMLElement) {
    super(parentElement);
    this.renderInitialLayout();
    this.initComponents();
    this.addEventListeners();
    this.fetchAndRenderMovies();
  }

  protected renderInitialLayout(): void {
    this.parentElement.innerHTML = /*html*/ `
      <section class="top-rated-container">
      </section>
      <section class="movie-list-container">
          <h2>지금 인기 있는 영화</h2>
          <ul class='thumbnail-list'></ul>
          <div class="scroll-sentinel" style="height: 1px;"></div> 
      </section>
    `;
  }

  protected initComponents(): void {
    super.initComponents();

    const $topRatedContainer = this.parentElement.querySelector(
      ".top-rated-container"
    );

    if (isHTMLElement($topRatedContainer)) {
      this.TopRatedMovie = new TopRatedMovie($topRatedContainer);
    }
  }

  protected async fetchAndRenderMovies(): Promise<void> {
    this.showLoading();

    const { movies } = await this.movieData();
    movies;

    this.renderTopRatedMovie(movies[0]);
    this.renderMovies(movies);
    this.addEventListeners();
  }

  protected showLoading(): void {
    super.showLoading();
    this.TopRatedMovie.render({ status: "loading" });
  }

  protected renderTopRatedMovie(movie: Movie): void {
    this.TopRatedMovie.render({ status: "success", data: movie });
  }

  protected async movieData(): Promise<{
    movies: Movie[];
    total_pages: number;
  }> {
    try {
      const { movies, total_pages } = await MovieApi.fetchPopularMovies(
        this.page
      );

      return { movies, total_pages };
    } catch (e) {
      new ErrorScreen("오류가 발생했습니다.").render();

      return { movies: [], total_pages: 0 };
    }
  }

  protected shouldStopPagination(): boolean {
    return this.page >= PopularMovieBoard.MAX_PAGE;
  }
}

export default PopularMovieBoard;
