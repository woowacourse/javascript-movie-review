import { Logo } from "../assets";
import MovieList from "../domain/MovieList";
import { $ } from "../utils/domSelector";

const NavBar = {
  render: () => {
    return `
      <header>
        <h1><img src="${Logo}" alt="MovieList 로고" /></h1>
        <div class="search-box">
          <input id="search-input" type="text" placeholder="검색" />
          <button class="search-button">검색</button>
        </div>
      </header>`;
  },

  onPressEnter: () => {
    $<HTMLInputElement>("#search-input").addEventListener(
      "keydown",
      async (event: KeyboardEvent) => {
        if (event.key == "enter") {
          const target = event.target as HTMLInputElement;
          MovieList.initCurrentPage();
          // MovieListContainer.renderSkeleton();
          const movies = await MovieList.searchMovieData(target.value);
          // MovieListContainer.renderSkeleton();
        }
      }
    );
  },

  onClick: () => {
    $<HTMLButtonElement>(".search-button").addEventListener(
      "click",
      (event: Event) => {
        // domain 값 전달
      }
    );
  },

  // 검색 창 이벤트
};

export default NavBar;
