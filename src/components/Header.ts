import { MOVIE_APP_IMG_PATH } from '../constant/index';
import { $ } from '../utils/domHelper';

import movies from '../domain/Movies';

export default class Header extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <header>
      <h1><img src="${MOVIE_APP_IMG_PATH.logo}" alt="MovieList 로고" class="logo" /></h1>
      <form class="search-box">
        <input id="searchMovie" type="text" placeholder="검색" />
        <button class="search-button">검색</button>
      </form>
    </header>
  `;
  }

  connectedCallback() {
    $('.search-box').addEventListener('submit', (event) => {
      this.searchMovies(event);
    });

    $('.logo').addEventListener('click', () => {
      window.location.reload();
    });
  }

  searchMovies(event: Event) {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const { searchMovie } = event.target;

      $('.item-list').innerHTML = '';

      movies.searchMovies(searchMovie.value, true);
    }
  }
}
