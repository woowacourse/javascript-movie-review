import MovieItem from '../movie-item/MovieItem';

interface MovieGridProps {
  movieItems: MovieData[];
  gridTitle: string;
}

class MovieGrid {
  #container;
  #movieItems;
  #gridTitle;

  constructor({ movieItems = [], gridTitle }: MovieGridProps) {
    this.#container = document.createElement('main');
    this.#movieItems = movieItems;
    this.#gridTitle = gridTitle;
    this.render();
  }

  render() {
    this.#container.innerHTML = `<section>
    <h2>${this.#gridTitle}</h2>
            <ul class="thumbnail-list">
    ${this.#movieItemElements()}
    </section>`;
  }

  #movieItemElements() {
    return this.#movieItems.map((movieItem) => new MovieItem({ data: movieItem }).element.outerHTML).join('');
  }

  get element() {
    return this.#container;
  }
}

export default MovieGrid;
