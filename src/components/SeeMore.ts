import { $ } from '../utils/domHelper';
import movies from '../domain/Movies';

export default class SeeMore extends HTMLElement {
  constructor() {
    super();

    movies.subscribe('movies', this.showButton.bind(this));

    this.render();
  }

  render() {
    this.innerHTML = `<button class="btn primary full-width">더 보기</button>`;
  }

  connectedCallback() {
    $('.btn').addEventListener('click', () => {
      this.showMoreMovies();
    });
  }

  showMoreMovies() {
    if (movies.getIsSearched()) movies.searchMovies(movies.getQuery());
    else movies.popularMovies();
  }

  showButton() {
    if (movies.getIsEnd()) $('button.btn').classList.add('button--hidden');
    else $('button.btn').classList.remove('button--hidden');
  }
}
