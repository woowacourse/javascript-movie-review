import { Store } from '..';
import logo from '../assets/logo';
import { searchMovies } from '../service/movie';

export default class Header {
  constructor($parent) {
    this.$parent = $parent;

    this.render();
  }

  template() {
    return `
      <header>
        <h1><a href="./"><img src="${logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="js-search-input" type="text" name="keyword" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  bindEvent(onSubmitSearch) {
    const searchBox = this.$parent.querySelector('.search-box');

    const handleSubmitSearch = async (event) => {
      event.preventDefault();

      const keyword = new FormData(event.target).get('keyword');
      if (keyword.trim() === '') return;

      Store.page = 0;
      Store.keyword = keyword;

      onSubmitSearch();
    };

    searchBox?.addEventListener('submit', handleSubmitSearch);
  }

  render() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
  }
}
