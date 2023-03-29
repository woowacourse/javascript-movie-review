import { ERROR_MESSAGE } from '../constant';
import movies from '../domain/Movies';

export default class Title extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('movies', this.render.bind(this));
    movies.subscribe('error', this.errorRender.bind(this));
    movies.subscribe('noSearched', this.noSearchedRender.bind(this));

    this.render();
  }

  render() {
    this.innerHTML = `<h2 class="movie-list-title">${movies.getTitle()}</h2>`;
  }

  errorRender() {
    this.innerHTML = `<h2 class="error-title">${ERROR_MESSAGE.unableAccess}</h2>`;
  }

  noSearchedRender() {
    this.innerHTML = `<h2 class="no-searched-title">${ERROR_MESSAGE.noResult}</h2>`;
  }
}
