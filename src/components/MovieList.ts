import { $ } from '../utils/domHelper';
import MovieItem from './MovieItem';
import movies from '../domain/Movies';

export default class MovieList {
  private $target;

  constructor($parentTarget: HTMLElement) {
    $parentTarget.insertAdjacentHTML('beforeend', this.initTemplate());
    this.$target = $('.item-list');

    movies.subscribe('movies', this.render.bind(this));
    movies.subscribe('loading', this.skeletonRender.bind(this));
  }

  initTemplate() {
    return `
      <ul class="item-list movie-container"></ul>
    `;
  }

  skeletonTemplate() {
    return `
    <ul class="item-list skeleton-container">
    ${new Array(20)
      .fill('')
      .map(() => new MovieItem().skeletonTemplate())
      .join('')}
      </ul>
      `;
  }

  skeletonRender() {
    this.$target.insertAdjacentHTML('beforeend', this.skeletonTemplate());
  }

  render(popularMovies: any) {
    $('.skeleton-container').remove();

    this.$target.insertAdjacentHTML('beforeend', this.template(popularMovies));
  }

  template(popularMovies: any) {
    return popularMovies
      .map((movie: any) => new MovieItem().template(movie))
      .join('');
  }
}
