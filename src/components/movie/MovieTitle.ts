import { NONE_MOVIE_INFO } from '../../constants';
import { createElementWithAttribute } from '../../utils';

class MovieTitle {
  #element: HTMLElement;

  constructor(title: string | null) {
    this.#element = this.#makeMovieTitle(title);
  }

  get element() {
    return this.#element;
  }

  #makeMovieTitle = (title: string | null) => {
    const $title = createElementWithAttribute('p', { class: 'movie-title' });
    $title.textContent = title || NONE_MOVIE_INFO.title;

    return $title;
  };
}

export default MovieTitle;
