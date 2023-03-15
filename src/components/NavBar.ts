import MovieList from "../domain/MovieList";
import MovieListContainer from "./MovieListContainer";
import { Logo } from "../assets";
import { $ } from "../utils/domSelector";

const NavBar = {
  render: () => {
    return `
      <header>
        <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
        <form class="search-box">
          <input id="search-input" type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </form>
      </header>`;
  },

  onSubmit: () => {
    $<HTMLFormElement>(".search-box").addEventListener(
      "submit",
      async (event: Event) => {
        event.preventDefault();
        const target = event.target as HTMLFormElement;
        const inputElement = target.elements[0] as HTMLInputElement;
        MovieList.setSearchKey(inputElement.value);
        MovieList.initCurrentPage();
        MovieListContainer.loadMovies(inputElement.value);
      }
    );
  },
};

export default NavBar;
