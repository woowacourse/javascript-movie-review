import MovieItem from '../movie-item/MovieItem';
import { ERROR_MESSAGE } from '../../../constants/errorMessage';
import ErrorMessage from '../../common/error-message/ErrorMessage';
import { MovieData } from '../../../../types/movie';
import { FETCH_COUNT } from '../../../constants/systemConstants';

type MovieGridStatus = 'loading' | 'loaded' | 'empty';

class MovieGrid {
  #container: HTMLElement;
  #movieItemComponents: MovieItem[] = [];

  #status: MovieGridStatus = 'loading';

  constructor() {
    this.#container = document.createElement('ul');
    this.#container.classList.add('thumbnail-list');

    this.render();
  }

  render() {
    this.#container.innerHTML = '';
    if (this.#status === 'empty') {
      this.#container.innerHTML = this.#emptyListElement();
      return;
    }
    this.#movieItemComponents.map((movieItem) => this.#container.appendChild(movieItem.element));
  }

  setStatus(status: MovieGridStatus) {
    this.#status = status;
    this.render();
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

  resetSkeletonItems() {
    this.#movieItemComponents.filter((component) => {
      const isDataExist = component.hasData();
      if (!isDataExist) {
        component.element.remove();
      }
      return isDataExist;
    });
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
