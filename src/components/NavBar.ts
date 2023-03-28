import { PAGE_BASE_URL } from '../constants';
import { $ } from '../utils/domSelector';
import { Logo } from '../assets';
import MovieList from '../domain/MovieList';

class NavBar {
  private static instance: NavBar;

  constructor() {
    this.render();
    this.addEventListenerToSearchInput();
    this.addEventListenerToSearchBox();
  }

  static getInstance(): NavBar {
    if (!NavBar.instance) {
      NavBar.instance = new NavBar();
    }

    return NavBar.instance;
  }

  private render() {
    $<HTMLDivElement>('#app').insertAdjacentHTML('afterbegin', this.template());
  }

  private template() {
    return `
      <header>
        <h1><a href="${PAGE_BASE_URL}"><img src="${Logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="search-input" name="search-input" type="text" placeholder="검색" />
          <button id="search-button">검색</button>
        </form>
      </header>`;
  }

  private addEventListenerToSearchInput() {
    $<HTMLFormElement>('.search-box').addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const inputElement = target['search-input'] as HTMLInputElement;
      const searchQuery = inputElement.value.trim();

      if (searchQuery === '') return;

      history.pushState(
        { isList: true, searchQuery: searchQuery, timestamp: new Date().getTime() },
        '',
        `${PAGE_BASE_URL}search?q=${searchQuery}`
      );
      MovieList.init(searchQuery);
      MovieList.getMovieData();
    });
  }

  private addEventListenerToSearchBox() {
    $<HTMLFormElement>('#search-button').addEventListener('click', (event) => {
      const target = event.target as HTMLButtonElement;

      if (window.innerWidth <= 600) {
        const form = target.closest('.search-box') as HTMLFormElement;
        form.classList.toggle('search-box--expand');
      }
    });
  }
}

export default NavBar.getInstance();
