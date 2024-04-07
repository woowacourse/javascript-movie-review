import { $ } from "./utils/selector";
import MoviePosterBoard from "./components/MoviePosterBoard/MoviePosterBoard";
import Header from "./components/Header/Header";

class DOMController {
  static moviePosterBoard = new MoviePosterBoard("popular");

  static renderPopularMoviePosterBoard() {
    this.moviePosterBoard = new MoviePosterBoard("popular");

    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static renderHeader() {
    const header = new Header().element;

    $("body")?.append(header);
  }

  static renderMoviePosterBoard() {
    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static async renderSearchMoviePosterBoard(keyword: string) {
    this.moviePosterBoard = new MoviePosterBoard("search", keyword);

    this.renderMoviePosterBoard();
  }
}

export default DOMController;
