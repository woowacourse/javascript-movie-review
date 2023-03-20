import { $ } from '../utils/domSelector';
import { Logo } from '../assets';
import MovieList from '../domain/MovieList';

const NavBar = {
  template() {
    return `
      <header>
        <h1><a href=""><img src="${Logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="search-input" name="search-input" type="text" placeholder="검색" />
          <button id="search-button">검색</button>
        </form>
      </header>`;
  },

  addEventToSearchInput() {
    $<HTMLFormElement>('.search-box').addEventListener('submit', (event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const inputElement = target['search-input'] as HTMLInputElement;
      const searchQuery = inputElement.value.trim();

      if (searchQuery === '') return;

      MovieList.init(searchQuery);
      MovieList.getMovieData();
    });
  },
};

export default NavBar;
