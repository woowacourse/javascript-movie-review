import MovieItem from '../movie-item/MovieItem';
import { ERROR_MESSAGE } from '../../constants/errorMessage';
import ErrorMessage from '../error-message/ErrorMessage';
import { $ } from '../../utils/selector';

interface MovieGridProps {
  movieItems: MovieData[];
}

class MovieGrid {
  #container;
  #movieItems;
  #listElement: HTMLElement | null = null;

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
      </ul>`;
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

  appendMovies(newItems: MovieData[]) {
    this.#listElement = $({ root: this.#container, selector: '.thumbnail-list' }) as HTMLElement | null;
    newItems.forEach((movieItem) => {
      const item = new MovieItem({ data: movieItem });
      if (!this.#listElement) throw new Error('listElement가 존재하지 않습니다.');
      this.#listElement.insertAdjacentHTML('beforeend', item.element.outerHTML);
    });
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
