import { createElementWithAttribute } from '../../utils';

class MovieTitle {
  #element: HTMLElement;

  constructor(title: string) {
    this.#element = this.#makeMovieTitle(title);
  }

  get element() {
    return this.#element;
  }

  #makeMovieTitle = (title: string) => {
    const $title = createElementWithAttribute('p', { class: 'movie-title' });
    $title.textContent = title;

    return $title;
  };
}

export default MovieTitle;
