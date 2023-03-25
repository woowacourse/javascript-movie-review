import { $ } from '../utils/domHelper';
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
    this.innerHTML = `<h2 class="error-title">네트워크 연결이 불안정 합니다. 잠시 후 다시 시도해주세요.</h2>`;
  }

  noSearchedRender() {
    this.innerHTML = `<h2 class="no-searched-title">찾으시는 영화 목록이 없습니다.</h2>`;
  }
}
