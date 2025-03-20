import { fetchSearchMovieList } from "../../utils/api.ts";
import { $ } from "../../utils/dom.ts";
import { loadMovies } from "../../utils/loadMovies.ts";
import LoadMoreButton from "../movie/LoadMoreButton.ts";
import NoSearchResults from "../movie/NoSearchResults.ts";

const SearchBar = () => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "검색어를 입력하세요");
  searchBar.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "🔎";
  searchBar.appendChild(button);

  button.addEventListener("click", () => {
    searchMovie(input.value);
  });

  input.addEventListener("keydown", async (e) => {
    if (e.key === "Enter") {
      searchMovie(input.value);
    }
  });

  return searchBar;
};

const searchMovie = async (input: string) => {
  const movies = await fetchSearchMovieList(input, 1);
  $(".top-rated-container").classList.add("hidden");
  $(".overlay-img").classList.add("hidden");

  $(".thumbnail-list").replaceChildren();
  $(".load-more").remove();
  $("#caption").innerText = `"${input}" 검색 결과`;

  if (movies.results.length === 0) {
    $(".thumbnail-list").after(NoSearchResults());
    return;
  }

  loadMovies(movies);

  if (movies.results.length > 0) {
    $(".thumbnail-list").after(
      LoadMoreButton({
        loadFn: (currentPage: number) =>
          fetchSearchMovieList(input, currentPage),
      })
    );
  }
};

export default SearchBar;
