import { MOVIE_APP_IMG_PATH } from '../constant/index';
import { $ } from '../utils/domHelper';

import movies from '../domain/Movies';

export default class Header {
  private $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  setEvent() {
    $('.search-box').addEventListener('submit', (event) => {
      this.searchMovies(event);
    });

    $('.logo').addEventListener('click', () => {
      window.location.reload();
    });
  }

  render() {
    this.$target.innerHTML = this.template();

    return this;
  }

  template() {
    return `
      <header>
        <h1><img src="${MOVIE_APP_IMG_PATH.logo}" alt="MovieList 로고" class="logo" /></h1>
        <form class="search-box">
          <input id="searchMovie" type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  searchMovies(event: Event) {
    event.preventDefault();

    if (event.target instanceof HTMLFormElement) {
      const { searchMovie } = event.target;

      $('.item-list').innerHTML = '';

      movies.searchMovies(searchMovie.value);
    }
  }
}
