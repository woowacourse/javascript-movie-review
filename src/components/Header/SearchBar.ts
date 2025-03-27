// SearchBar.ts
import { fetchSearchedMovies } from "../../APIs/movieAPI";
import Store from "../../store/store";

const SEARCH_FORM = "search-form";

const SearchBar = (store: Store): string => {
  setTimeout(() => attachSearchEvent(store), 0);

  return /* html */ `
    <div class="search-bar-container">
      <form id="${SEARCH_FORM}" class="${SEARCH_FORM}" data-testid="${SEARCH_FORM}">
        <input type="text" name="query" data-testid="search-input" class="search-bar" placeholder="검색어를 입력하세요" autocomplete="off" />
        <button type="submit" class="search-button">
          <img src="./images/search.png" alt="search" width="16" height="16" />
        </button>
      </form>
    </div>
  `;
};

function attachSearchEvent(store: Store): void {
  const $searchForm = document.querySelector(
    "#search-form"
  ) as HTMLFormElement | null;
  if ($searchForm) {
    $searchForm.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
      const formData = new FormData($searchForm);
      const query = formData.get("query") as string;
      if (!query) return;

      store.setState({ loading: true });
      const searchedMovies = await fetchSearchedMovies(query, (error: Error) =>
        alert(error.message)
      );
      if (searchedMovies) {
        store.setState({
          movies: searchedMovies.results,
          query: query as string,
          searchedMoviesLength: searchedMovies.total_results,
        });
      }
      store.setState({ loading: false });
      $searchForm.reset();
      window.scrollTo(0, 0);
    });
  }
}

export default SearchBar;
