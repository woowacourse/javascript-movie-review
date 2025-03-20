import MovieItem from '../movie-item/MovieItem';
import EmptyResult from '../../component/empty-result/EmptyResult';

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
      ${this.#movieItemElements()};
      </ul>`;
      return;
    }
    console.log('자곧ㅇㄹㅇㄴㄹㅇㄹ');
    this.#container.innerHTML = this.#emptyListElement();
  }

  #emptyListElement() {
    return new EmptyResult().element.outerHTML;
  }

  #movieItemElements() {
    return this.#movieItems.map((movieItem) => new MovieItem({ data: movieItem }).element.outerHTML).join('');
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
