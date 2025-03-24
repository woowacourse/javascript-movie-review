import MovieItem from '../movie-item/MovieItem';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import ErrorMessage from '../error-message/ErrorMessage';
import { MovieData } from '../../../types/movie';

interface MovieGridProps {
  movieItems: MovieData[];
}

class MovieGrid {
  #container;
  #movieItems;

  constructor({ movieItems = [] }: MovieGridProps) {
    this.#container = document.createElement('main');
    this.#movieItems = movieItems;
    this.render();
  }

  render() {
    if (this.#movieItems.length !== 0) {
      this.#container.innerHTML = `
      <ul class="thumbnail-list">
        ${this.#movieItemElements()}
      </ul>
    `;
      return;
    }
    this.#container.innerHTML = this.#emptyListElement();
  }

  #emptyListElement() {
    return new ErrorMessage({ errorMessage: ERROR_MESSAGE.NO_RESULT }).element.outerHTML;
  }

  #movieItemElements() {
    return this.#movieItems.map((movieItem) => new MovieItem({ data: movieItem }).element.outerHTML).join('');
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
