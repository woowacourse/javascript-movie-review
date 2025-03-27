import { fetchSearchedMovies } from "../../APIs/movieAPI.ts";
import store from "../../store/store.ts";

export function SearchBarRender() {
  return /* html */ `
    <div class="search-bar-container">
      <form id="search-form" class="search-form" data-testid='search-form'>
        <input type="text" name="query" data-testid='search-input' class="search-bar" placeholder="검색어를 입력하세요" autocomplete="off" />
        <button type="submit" class="search-button">
          <img src="./images/search.png" alt="search" width="16" height="16" />
        </button>
      </form>
    </div>
  `;
}

export function SearchBarMount() {
  const $searchForm = document.querySelector("#search-form");
  if ($searchForm) {
    $searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData($searchForm);
      const query = formData.get("query");
      if (!query) return;

      const searchedMovies = await fetchSearchedMovies(query);
      if (searchedMovies) {
        store.setState({
          movies: searchedMovies.results,
          query: query,
          searchedMoviesLength: searchedMovies.total_results,
        });
      }
      $searchForm.reset();
    });
  }
}
