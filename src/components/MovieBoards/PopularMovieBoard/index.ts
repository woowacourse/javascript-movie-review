import { createApi } from "../../../api/ApiFactory";
import { Movie } from "../../../types/movie";
import { isHTMLElement } from "../../../utils/typeGuards";
import BaseMovieBoard, { MovieBoardConfig } from "../@shared/BaseMovieBoard";
import ErrorScreen from "../@shared/ErrorScreen";
import MovieList from "../@shared/MovieList";
import TopRatedMovie from "./TopRatedMovie";

class PopularMovieBoard extends BaseMovieBoard {
  constructor(parentElement: HTMLElement) {
    const apiInstance = createApi(() =>
      new ErrorScreen("오류가 발생했습니다.").render()
    );

    const config: MovieBoardConfig = {
      parentElement,
      initialRender: () => {
        parentElement.innerHTML = /*html*/ `
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
            <ul class="thumbnail-list">
              ${new MovieList([]).skeleton}
            </ul>
          </section>
        `;
      },
      fetchMovies: async (page: number) => {
        const data = await apiInstance.popularMovies(page);
        return { movies: data.results, total_pages: data.total_pages };
      },
      renderMovieList: (movies: Movie[]) => new MovieList(movies).ui,
    };

    super(config);
  }

  override renderMovies(movies: Movie[]): void {
    if (this.currentPage === 1 && movies.length > 0) {
      const topRatedContainer = this.config.parentElement.querySelector(
        ".top-rated-container"
      );
      if (!isHTMLElement(topRatedContainer)) return;
      topRatedContainer.innerHTML = new TopRatedMovie(movies[0]).ui;
    }

    super.renderMovies(movies);
  }
}

export default PopularMovieBoard;
