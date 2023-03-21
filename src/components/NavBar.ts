import { $ } from '../utils/domSelector';
import { Logo } from '../assets';
import MovieList from '../domain/MovieList';

class NavBar {
  private static instance: NavBar;

  constructor() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', this.template());
    this.addEventListenerToSearchInput();
  }

  static getInstance(): NavBar {
    if (!NavBar.instance) {
      NavBar.instance = new NavBar();
    }

    return NavBar.instance;
  }

  template() {
    return `
      <header>
        <h1><a href=""><img src="${Logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="search-input" name="search-input" type="text" placeholder="검색" />
          <button id="search-button">검색</button>
        </form>
      </header>`;
  }

  addEventListenerToSearchInput() {
    $<HTMLFormElement>('.search-box').addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const inputElement = target['search-input'] as HTMLInputElement;
      const searchQuery = inputElement.value.trim();

      if (searchQuery === '') return;

      history.pushState(
        { isList: true, searchQuery: searchQuery, timestamp: new Date().getTime() },
        '',
        `/search?q=${searchQuery}`
      );
      MovieList.init(searchQuery);
      MovieList.getMovieData();
    });
  }
}

export default NavBar.getInstance();
