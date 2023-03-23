import { MovieItemType } from '../type/movie';
import { $ } from '../utils/domHelper';
import InfiniteScroll from '../utils/infiniteScroll';

import movies from '../domain/Movies';

export default class MovieList extends HTMLElement {
  infiniteScroll: any;

  constructor() {
    super();

    movies.subscribe('movies', this.movieItemRender.bind(this));
    movies.subscribe('loading', this.skeletonItemRender.bind(this));

    this.render();
    this.skeletonItemRender();

    this.infiniteScroll = new InfiniteScroll();
  }

  render() {
    this.innerHTML = `<ul class="item-list movie-container"></ul>`;
  }

  skeletonItemRender() {
    $('.movie-container').insertAdjacentHTML(
      'beforeend',
      this.skeletonItemTemplate()
    );
  }

  skeletonItemTemplate() {
    return `
    <ul class="item-list skeleton-container">
    ${new Array(20)
      .fill('')
      .map(() => `<skeleton-item></skeleton-item>`)
      .join('')}
    </ul>`;
  }

  movieItemRender(popularMovies?: MovieItemType[]) {
    $('.skeleton-container').remove();

    $('.movie-container').insertAdjacentHTML(
      'beforeend',
      this.movieItemTemplate(popularMovies) || ''
    );

    this.infiniteScroll.setItem($('.movie-container').lastElementChild, true);
  }

  movieItemTemplate(popularMovies?: MovieItemType[]) {
    return popularMovies
      ?.map(
        ({ id, poster_path, title, vote_average }: MovieItemType) =>
          `<movie-item id="${id}" poster-path="${poster_path}" title="${title}" vote-average="${vote_average}"></movie-item>`
      )
      .join('');
  }
}
