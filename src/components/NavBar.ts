import MovieList from "../domain/MovieList";
import { Logo } from "../assets";
import { $ } from "../utils/domSelector";
import MovieListContainer from "./MovieListContainer";

const NavBar = {
  render: () => {
    return `
      <header>
        <h1><a href=""><img src="${Logo}" alt="MovieList 로고" /></a></h1>
        <form id="search-form" class="search-box">
          <input id="search-input" name="search-input" type="text" placeholder="검색" />
          <button id="search-button">검색</button>
        </form>
      </header>`;
  },

  bindSubmitEvent: () => {
    $<HTMLFormElement>(".search-box").addEventListener("submit", (event) =>
      NavBar.onSubmitSearchForm(event)
    );
  },

  onSubmitSearchForm: async (event: SubmitEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const inputElement = target["search-input"] as HTMLInputElement;

    if (inputElement.value.trim().length === 0) return;

    MovieList.init(inputElement.value);

    MovieListContainer.onSearch(inputElement.value);
  },
};

export default NavBar;
