import { fetchSearchedMovies } from "../../APIs/movieAPI.ts";
import store from "../../store/store.ts";

const SEARCH_FORM = "search-form";

const SearchBar = () => {
  setTimeout(() => attachSearchEvent(), 0);

  return /* html */ `
    <div class="search-bar-container">
      <form id="${SEARCH_FORM}" class="${SEARCH_FORM}" data-testid='${SEARCH_FORM}'>
        <input type="text" name="query" data-testid='search-input' class="search-bar" placeholder="검색어를 입력하세요" autocomplete="off" />
        <button type="submit" class="search-button">
          <img src="./images/search.png" alt="search" width="16" height="16" />
        </button>
      </form>
    </div>
  `;
};

function attachSearchEvent() {
  const $searchForm = document.querySelector("#search-form");

  if ($searchForm) {
    $searchForm.addEventListener("submit", async (event) => {
      event.preventDefault();
      const formData = new FormData($searchForm);
      const query = formData.get("query");
      if (!query) return;

      const searchedMovies = await fetchSearchedMovies(query, (error) =>
        alert(error.message)
      );
      if (searchedMovies) {
        store.setState({
          movies: searchedMovies.results,
          query: query,
          searchedMoviesLength: searchedMovies.total_results,
        });
      }
      $searchForm.reset();
      window.scrollTo(0, 0);
    });
  }
}

export default SearchBar;
