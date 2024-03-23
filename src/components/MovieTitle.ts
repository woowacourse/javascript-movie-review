import { Movie } from '../type/movie';
import { createElementWithAttribute } from '../utils';

class MovieTitle {
  #element: HTMLElement;

  constructor(movie: Movie) {
    this.#element = this.#makeMovieTitle(movie);
  }

  get element() {
    return this.#element;
  }

  #makeMovieTitle = (movie: Movie) => {
    const $title = createElementWithAttribute('p', { class: 'movie-title' });
    $title.textContent = movie.title;

    return $title;
  };
}

export default MovieTitle;
