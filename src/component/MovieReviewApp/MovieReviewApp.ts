import MovieReviewHeader from "../MovieReviewHeader/MovieReviewHeader";
import MovieSearchInput from "../MovieSearchInput/MovieSearchInput";

class MovieReviewApp {
  render() {
    const headerElement = document.querySelector("header");
    const movieSearchInput = new MovieSearchInput();

    if (headerElement) {
      headerElement.appendChild(MovieReviewHeader.createHeader());
      headerElement.appendChild(movieSearchInput.createSearchBox());
    }
  }
}

export default MovieReviewApp;
