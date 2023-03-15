import { $ } from '../utils/domHelper';
import MovieItem from './MovieItem';
import movies from '../domain/Movies';

export default class MovieList {
  $target;

  constructor($parentTarget: HTMLElement) {
    $parentTarget.insertAdjacentHTML('beforeend', this.initTemplate());

    movies.subscribe('movies', this.render.bind(this));
    this.$target = $('.item-list');
  }

  initTemplate() {
    return `
      <ul class="item-list"></ul>
    `;
  }

  async render(popularMovies: any) {
    this.$target.insertAdjacentHTML(
      'beforeend',
      await this.template(popularMovies)
    );
  }

  async template(popularMovies: any) {
    return popularMovies
      .map((movie: any) => new MovieItem().template(movie))
      .join('');
  }
}
