import MovieReviewHeader from "../MovieReviewHeader/MovieReviewHeader";
import MovieSearchInput from "../MovieSearchInput/MovieSearchInput";
import MovieList from "../MovieList/MovieList";

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
    const movieList = new MovieList();
  }

  render() {
    this.#renderMovieReviewHeader();
    this.#renderMovieReviewMain();
  }
}

export default MovieReviewApp;
