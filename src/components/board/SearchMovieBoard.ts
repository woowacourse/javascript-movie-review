import MovieApi from "../../api/MovieApi";
import { Movie } from "../../types/movie";
import { isHTMLElement } from "../../utils/typeGuards";
import ErrorScreen from "../ErrorScreen";
import AbstractMovieBoard from "./AbstractMovieBoard";

interface Props {
  searchParams: string;
}

class SearchMovieBoard extends AbstractMovieBoard {
  private static readonly LOAD_COUNT = 20;

  protected props;

  constructor(parentElement: HTMLElement, props: Props) {
    super(parentElement);
    this.props = props;
    this.renderInitialLayout();
    this.initComponents();
    this.addEventListeners();
    this.fetchAndRenderMovies();
  }

  protected renderInitialLayout(): void {
    this.parentElement.innerHTML = /*html*/ `
      <section class="movie-list-container search-movie-list-container">
          <h2>"${this.props.searchParams}" 검색 결과 </h2>
          <ul class='thumbnail-list'></ul>
          <div class="scroll-sentinel" style="height: 1px;"></div>
      </section>
    `;
  }

  protected initComponents(): void {
    super.initComponents();
  }

  async fetchAndRenderMovies(): Promise<void> {
    this.showLoading();

    const { movies } = await this.movieData();

    if (movies.length === 0) {
      this.ScrollManager.stop();
      this.#renderNoResult();
      return;
    }

    this.renderMovies(movies);
    this.addEventListeners();
    if (movies.length < SearchMovieBoard.LOAD_COUNT) return;
  }

  protected async movieData(): Promise<{
    movies: Movie[];
    total_pages: number;
  }> {
    try {
      const { movies, total_pages } = await MovieApi.fetchSearchMovies(
        this.page,
        this.props.searchParams
      );

      return { movies, total_pages };
    } catch (e) {
      new ErrorScreen("오류가 발생했습니다.").render();

      return { movies: [], total_pages: 0 };
    }
  }

  protected shouldStopPagination(total_pages: number): boolean {
    return this.page >= SearchMovieBoard.LOAD_COUNT || this.page >= total_pages;
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
}

export default SearchMovieBoard;
