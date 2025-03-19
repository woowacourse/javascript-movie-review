import MovieItem from '../movie-item/MovieItem';

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
    this.#container.innerHTML = `
    <ul class="thumbnail-list">
    ${this.#movieItemElements()}
    </ul>`;
  }

  #movieItemElements() {
    return this.#movieItems.map((movieItem) => new MovieItem({ data: movieItem }).element.outerHTML).join('');
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
