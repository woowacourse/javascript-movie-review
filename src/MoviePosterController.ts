import { MovieInfo } from "./components/MoviePoster/createMoviePoster";
import { $ } from "./utils/selector";
import MoviePosterBoard from "./components/MoviePosterBoard/MoviePosterBoard";
import createHeader from "./components/Header/createHeader";

class MoviePosterController {
  static moviePosterBoard = new MoviePosterBoard("popular");

  static renderPopularMoviePosterBoard() {
    this.moviePosterBoard = new MoviePosterBoard("popular");

    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static renderHeader() {
    const header = createHeader();

    $("body")?.append(header);
  }

  static renderMoviePosterBoard() {
    $("body>section")?.remove();
    $("body")?.append(this.moviePosterBoard.element);
  }

  static addToMoviePosterBoard(movieInfos: MovieInfo[]) {
    this.moviePosterBoard.addMoviePoster(movieInfos);
  }

  static async renderSearchMoviePosterBoard(keyword: string) {
    this.moviePosterBoard = new MoviePosterBoard("search", keyword);

    this.renderMoviePosterBoard();
  }
}

export default MoviePosterController;
