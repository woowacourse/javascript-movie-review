import { Store } from '..';
import logo from '../assets/logo.png';
import { searchMovies } from '../service/movie';
import { Movie } from '../service/types';

export default class Header {
  $parent: HTMLElement;

  constructor($parent: HTMLElement) {
    this.$parent = $parent;
    this.$parent.insertAdjacentHTML('beforeend', this.template());
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

  bindEvent(
    removeSkeleton: () => void,
    showSkeleton: () => void,
    onSubmitSearch: (results: Movie[], totalPages: number) => void,
  ) {
    const searchBox = this.$parent.querySelector('.search-box');

    const handleSubmitSearch = async (event: Event) => {
      event.preventDefault();

      showSkeleton();

      const keyword = new FormData(event.target as HTMLFormElement).get('keyword') as string;
      const { results, total_pages } = await searchMovies({ query: keyword, page: 1 });

      Store.keyword = keyword;

      removeSkeleton();

      onSubmitSearch(results, total_pages);
    };

    searchBox?.addEventListener('submit', handleSubmitSearch);
  }
}
