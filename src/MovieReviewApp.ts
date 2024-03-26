import MovieList from './component/MovieList/MovieList';
import MovieReviewHeader from './component/MovieReviewHeader/MovieReviewHeader';
import MovieSearchInput from './component/MovieSearchInput/MovieSearchInput';
import { $ } from './utility/dom';

class MovieReviewApp {
  #renderMovieReviewHeader() {
    const headerElement = $('header');

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
