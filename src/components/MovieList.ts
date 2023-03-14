import { $ } from '../utils/domHelper';
import MovieItem from './MovieItem';
import Movies from '../domain/Movies.js';

export default class MovieList {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  async render() {
    const movies = await new Movies().setMovies();

    const movieItems = movies
      .map((movie: any) => new MovieItem().template(movie))
      .join('');

    this.$target.innerHTML = this.template(movieItems);
  }

  template(movieItems: string) {
    return `
      <ul class="item-list">
      ${movieItems}
      </ul>
    `;
  }
}
