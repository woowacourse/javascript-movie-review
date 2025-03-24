import { fetchSearchMovieList } from "../../utils/api.ts";
import { $ } from "../../utils/dom.ts";
import LoadMoreButton from "../movie/LoadMoreButton.ts";
import MovieList from "../movie/MovieList.ts";
import NoSearchResults from "../movie/NoSearchResults.ts";
import hideSkeleton from "../utils/hideSkeleton.ts";
import showSkeleton from "../utils/showSkeleton.ts";

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
  const thumbnailList = $(".thumbnail-list");
  thumbnailList.replaceChildren();
  $(".load-more")?.remove();
  $("#caption").innerText = `"${input}" 검색 결과`;

  showSkeleton();
  const movies = await fetchSearchMovieList(input, 1);

  if (movies.status === "fail") {
    thumbnailList.appendChild(
      NoSearchResults("영화 목록을 가져오지 못했습니다.")
    );
  }

  if (movies.status === "success") {
    $(".top-rated-container").classList.add("hidden");
    $(".overlay-img").classList.add("hidden");

    MovieList(movies.data);

    thumbnailList.after(
      LoadMoreButton({
        loadFn: (currentPage: number) =>
          fetchSearchMovieList(input, currentPage),
      })
    );
  }

  hideSkeleton();
};

export default SearchBar;
