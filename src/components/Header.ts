import { MOVIE_APP_IMG_PATH } from '../constant/index';

export default class Header {
  $target;

  constructor($target: HTMLElement) {
    this.$target = $target;
  }

  render() {
    this.$target.innerHTML = this.template();
  }

  template() {
    return `
      <header>
        <h1><img src="${MOVIE_APP_IMG_PATH.logo}" alt="MovieList 로고" /></h1>
        <div class="search-box">
          <input type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>
      </header>
    `;
  }
}
