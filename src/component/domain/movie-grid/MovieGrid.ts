import MovieItem from '../movie-item/MovieItem';
import { ERROR_MESSAGE } from '../../../constants/errorMessage';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import { MovieData } from '../../../../types/movie';
import { FETCH_COUNT } from '../../../constants/systemConstants';

interface MovieGridProps {
  movieItemsCount: number;
}

class MovieGrid {
  #container: HTMLElement;
  #movieItems: (MovieData | null)[];
  #movieItemComponents: MovieItem[] = [];

  #isLoading: boolean = true;

  constructor({ movieItemsCount }: MovieGridProps) {
    this.#container = document.createElement('ul');
    this.#container.classList.add('thumbnail-list');

    const initialMovieItems = new Array(movieItemsCount).fill(null);
    this.#movieItems = initialMovieItems;

    this.render();
  }

  render() {
    this.#container.innerHTML = '';
    if (!this.#isLoading && this.#movieItems.length === 0) {
      this.#container.innerHTML = this.#emptyListElement();
      return;
    }
    this.#movieItemComponents.map((movieItem) => this.#container.appendChild(movieItem.element));
  }

  #emptyListElement() {
    return new ErrorMessage({ errorMessage: ERROR_MESSAGE.NO_RESULT }).element.outerHTML;
  }

  appendSkeletonItems() {
    for (let i = 0; i < FETCH_COUNT; i++) {
      const item = new MovieItem();
      this.#movieItemComponents.push(item);
      this.#container.appendChild(item.element);
    }
  }

  replaceLastNItems(data: MovieData[]) {
    for (let i = 0; i < data.length; i++) {
      const index = this.#movieItemComponents.length - data.length + i;
      if (this.#movieItemComponents[index]) {
        this.#movieItemComponents[index].setData(data[i]);
      }
    }
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
