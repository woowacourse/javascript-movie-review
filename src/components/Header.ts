import { Store } from '..';
import logo from '../assets/logo.png';
import { getPopularMovies, searchMovies } from '../service/movie';
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
        <h1 id='logo'><img src="${logo}" alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input id="js-search-input" class="search-input" type="text" name="keyword" placeholder="검색" required/>
          <button id="js-search-button" class="search-button">검색</button>
        </form>
      </header>
    `;
  }

  bindEvent(
    removeSkeleton: () => void,
    showSkeleton: () => void,
    onSubmitSearch: (results: Movie[], totalPages: number) => void,
    onClickLogo: () => void,
  ) {
    const $searchBox = this.$parent.querySelector('.search-box') as HTMLFormElement;

    const handleSubmitSearch = async (event: Event) => {
      event.preventDefault();
      const $searchInput = this.$parent.querySelector('#js-search-input') as HTMLInputElement;
      if ($searchInput.value.length === 0) return;

      showSkeleton();

      const keyword = new FormData(event.target as HTMLFormElement).get('keyword') as string;
      const { results, total_pages } = await searchMovies({ query: keyword, page: 1 });

      Store.keyword = keyword;

      removeSkeleton();

      onSubmitSearch(results, total_pages);
    };

    $searchBox?.addEventListener('submit', handleSubmitSearch);

    const $searchInput = this.$parent.querySelector('#js-search-input') as HTMLInputElement;
    const $searchButton = this.$parent.querySelector('#js-search-button') as HTMLButtonElement;

    $searchButton?.addEventListener('click', (e) => {
      if ($searchInput.value.length === 0) {
        $searchInput.focus();
      }
    });

    // 로고 클릭 시 인기있는영화 보여주도록
    const $logo = this.$parent.querySelector('#logo') as HTMLHeadingElement;
    $logo.addEventListener('click', async () => {
      onClickLogo();
    });
  }
}
