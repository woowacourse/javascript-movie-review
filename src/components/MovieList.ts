import { MovieItemType } from '../type/movie';
import { $ } from '../utils/domHelper';

import MovieItem from './MovieItem';
import movies from '../domain/Movies';

export default class MovieList extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('movies', this.render.bind(this));
    movies.subscribe('loading', this.skeletonRender.bind(this));

    this.skeletonRender();
    this.render();
  }

  render(popularMovies?: MovieItemType[]) {
    $('.skeleton-container').remove();

    this.innerHTML = `<ul class="item-list movie-container"></ul>`;

    $('.movie-container').insertAdjacentHTML(
      'beforeend',
      this.template(popularMovies) || ''
    );
  }

  template(popularMovies?: MovieItemType[]) {
    return popularMovies
      ?.map(
        ({ id, poster_path, title, vote_average }: MovieItemType) =>
          `<movie-item id=${id} poster-path=${poster_path} title=${title} vote-average=${vote_average}</movie-item>`
      )
      .join('');
  }

  skeletonRender() {
    this.insertAdjacentHTML('beforeend', this.skeletonTemplate());
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
}
