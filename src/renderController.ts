import MoviePoster, {
  MovieInfo,
} from "./components/MoviePoster/createMoviePoster";

import { $ } from "./utils/selector";
import CUSTOM_EVENT from "./constants/event";
import MoviePosterBoard from "./components/MoviePosterBoard/MoviePosterBoard";
import createHeader from "./components/Header/createHeader";

class RenderController {
  static moviePosterBoard = new MoviePosterBoard(
    "지금 인기있는 영화",
    "popular"
  );

  private static renderPopularMoviePosterBoard() {
    this.moviePosterBoard = new MoviePosterBoard(
      "지금 인기있는 영화",
      "popular"
    );

    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static renderHeader() {
    const header = createHeader();

    $("body")?.append(header);
    document.addEventListener(
      CUSTOM_EVENT.searchMovie,
      this.renderSearchMoviePosterBoard.bind(this)
    );

    document.addEventListener(
      CUSTOM_EVENT.showPopularMovie,
      this.renderPopularMoviePosterBoard.bind(this)
    );
  }

  static renderMoviePosterBoard() {
    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static addToMoviePosterBoard(movieInfos: MovieInfo[]) {
    this.moviePosterBoard.addMoviePoster(movieInfos);
  }

  static async renderSearchMoviePosterBoard(e: Event) {
    if (!(e instanceof CustomEvent)) return;

    const { keyword } = e.detail;
    this.moviePosterBoard = new MoviePosterBoard(
      keyword + " 검색 결과",
      "search",
      keyword
    );

    RenderController.renderMoviePosterBoard();
  }
}

export default RenderController;
