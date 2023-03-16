import { Store } from '..';
import logo from '../assets/logo';
import { searchMovies } from '../service/movie';

export default class Header {
  constructor($parent) {
    this.$parent = $parent;
  }

  template() {
    return `
      <header>
        <h1><a href="/"><img src="${logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="js-search-input" type="text" name="keyword" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  init() {
    this.$parent.insertAdjacentHTML('beforeend', this.template());
    return this;
  }

  bindEvent(toggleSkeleton, onSubmitSearch) {
    const searchBox = this.$parent.querySelector('.search-box');

    const handleSubmitSearch = async (event) => {
      event.preventDefault();

      toggleSkeleton();

      const keyword = new FormData(event.target).get('keyword');
      const { results, total_pages } = await searchMovies({ text: keyword, page: 1 });

      Store.keyword = keyword;

      toggleSkeleton();

      onSubmitSearch(results, total_pages);
    };

    searchBox?.addEventListener('submit', handleSubmitSearch);
  }
}
