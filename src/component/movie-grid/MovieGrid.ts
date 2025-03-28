import MovieItem from '../movie-item/MovieItem';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import ErrorMessage from '../error-message/ErrorMessage';

interface MovieGridProps {
  movieItems: MovieData[];
}

class MovieGrid {
  #container;
  #movieItems;
  #listElement: HTMLElement;

  constructor({ movieItems = [] }: MovieGridProps) {
    this.#container = document.createElement('main');
    this.#listElement = document.createElement('ul');
    this.#listElement.classList.add('thumbnail-list');
    this.#container.appendChild(this.#listElement);

    this.#movieItems = movieItems;
    this.render(this.#movieItems);
  }

  render(items: MovieData[]) {
    if (items.length === 0) {
      this.#container.innerHTML = this.#emptyListElement();
      return;
    }
    const itemsHTML = this.#movieItemElements(items);
    itemsHTML.forEach((el) => this.#listElement.appendChild(el));
  }

  #emptyListElement() {
    return new ErrorMessage({ errorMessage: ERROR_MESSAGE.NO_RESULT }).element.outerHTML;
  }

  #movieItemElements(items: MovieData[]) {
    return items.map((movieItem) => new MovieItem({ data: movieItem }).element);
  }

  appendMovies(newItems: MovieData[]) {
    const elements = this.#movieItemElements(newItems);
    this.#movieItems = [...this.#movieItems, ...newItems];
    return elements;
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
