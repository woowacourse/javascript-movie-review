import { $ } from '../utils/domHelper';
import movies from '../domain/Movies';

export default class Title extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('movies', this.render.bind(this));

    this.render();
  }

  render() {
    this.innerHTML = `<h2 class="movie-list-title">${movies.getTitle()}</h2>`;
  }
}
