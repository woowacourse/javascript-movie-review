import MovieListContent from './MovieListContent';
import MovieList from '../domain/MovieList';
import { Logo } from '../assets';
import { $ } from '../utils/domSelector';

const NavBar = {
  render: () => {
    return `
      <header>
        <h1><a href=""><img src="${Logo}" alt="MovieList 로고" /></a></h1>
        <form class="search-box">
          <input id="search-input" name="search-input" type="text" placeholder="검색" />
          <button id="search-button">검색</button>
        </form>
      </header>`;
  },

  onSubmit: () => {
    $<HTMLFormElement>('.search-box').addEventListener('submit', async (event: Event) => {
      event.preventDefault();
      const target = event.target as HTMLFormElement;
      const inputElement = target['search-input'] as HTMLInputElement;
      const searchKey = inputElement.value.trim();

      if (searchKey === '') return;

      MovieList.init(inputElement.value);

      MovieListContent.loadMovies(inputElement.value);
    });
  },
};

export default NavBar;
