import { fetchSearchMovieList } from "../../api/fetchSearchMovieList.ts";
import observeLoadMore from "../../domain/observeLoadMore.ts";
import { $ } from "../../utils/dom.ts";
import LoadMoreSection from "../movie/LoadMoreSection.ts";
import MovieList from "../movie/MovieList.ts";
import NoSearchResults from "../movie/NoSearchResults.ts";
import hideSkeleton from "../utils/hideSkeleton.ts";
import showSkeleton from "../utils/showSkeleton.ts";

const INITIAL_PAGE = 1;

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
  const movies = await fetchSearchMovieList(input, INITIAL_PAGE);

  if (movies.status === "fail") {
    thumbnailList.before(NoSearchResults("영화 목록을 가져오지 못했습니다."));
  }

  if (movies.status === "success") {
    $(".top-rated-container").classList.add("hidden");
    $(".overlay-img").classList.add("hidden");

    MovieList(movies.data);
    hideSkeleton();

    if (movies.data.page === movies.data.total_pages) return;

    thumbnailList.after(LoadMoreSection());

    let currentPage = 2;

    observeLoadMore({
      currentPage,
      loadFn: (currentPage: number) => fetchSearchMovieList(input, currentPage),
    });
  }
};

export default SearchBar;
