import { fetchSearchMovieList } from "../../utils/api.ts";
import { $ } from "../../utils/dom.ts";
import { loadMovies } from "../../utils/loadMovies.ts";
import NoSearchResults from "../movie/NoSearchResults.ts";
import { movieState } from "../../state/movieState.ts";

const SearchBar = () => {
  const searchBar = document.createElement("div");
  searchBar.classList.add("search-bar");

  const input = document.createElement("input");
  input.setAttribute("placeholder", "검색어를 입력하세요");
  input.type = "text";
  searchBar.appendChild(input);

  const button = document.createElement("button");
  button.innerText = "🔎";
  button.type = "button";
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
  movieState.setMode("search");
  $(".thumbnail-list").replaceChildren();
  $("#caption").innerText = `"${input}" 검색 결과`;

  try {
    movieState.setSearchKeyword(input);
    const movies = await fetchSearchMovieList(
      movieState.getSearchKeyword(),
      movieState.getCurrentPage()
    );

    movieState.setMaxPage(movies.total_pages);

    $(".top-rated-container").classList.add("hidden");
    $(".overlay-img").classList.add("hidden");

    if (movies.results.length === 0) {
      $(".thumbnail-list").after(NoSearchResults("검색 결과가 없습니다."));
      return;
    }
    loadMovies(movies);
  } catch (error) {
    $(".thumbnail-list").after(
      NoSearchResults("영화 목록을 가져오는 데 실패했습니다.")
    );
  }
};

export default SearchBar;
