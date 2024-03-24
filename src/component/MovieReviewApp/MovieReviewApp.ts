import MovieReviewHeader from "../MovieReviewHeader/MovieReviewHeader";
import MovieSearchInput from "../MovieSearchInput/MovieSearchInput";
import MovieListController from "../../controller/MovieListController";

import { $ } from "../../utility/dom";

class MovieReviewApp {
  #renderMovieReviewHeader() {
    const headerElement = $("header");

    const movieSearchInput = new MovieSearchInput();

    if (headerElement) {
      headerElement.appendChild(MovieReviewHeader.createHeader());
      headerElement.appendChild(movieSearchInput.createSearchBox());
    }
  }

  #renderMovieReviewMain() {
    try {
      const movieListController = new MovieListController();
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
      }
    }
  }

  render() {
    this.#renderMovieReviewHeader();
    this.#renderMovieReviewMain();
  }
}

export default MovieReviewApp;
