
import MovieService from "../services/MovieService";
import MovieList from "../domains/MovieList";
import { ContentsContainer, showSkeleton } from "./Contents";
import { ObserverHTMLElement, setupInfiniteScroll } from "./Main";
import { fetchSearchMovies } from "../apis/fetch";

function validateSearchInput(inputValue: string) {
  if (inputValue.trim() === "") {
    alert("검색어를 입력해주세요.");
    return false;
  }
  return true;
}

export function clickHome() {
  const $logo = document.querySelector(".logo");
  $logo?.addEventListener("click", () => {
    location.reload();
  });
}

function removeHeader() {
  const $wrap = document.getElementById("wrap") as HTMLDivElement;
  const $header = document.querySelector("header") as HTMLHeadElement;
  const $logoSearchBar = document.querySelector(
    ".logo-searchBar"
  ) as HTMLDivElement;

  if ($header) $header.remove();
  $wrap.prepend($logoSearchBar);
}

function clearMoviesContainer() {
  const $listContainer = document.querySelector(".thumbnail-list");
  if ($listContainer) {
    $listContainer.innerHTML = "";
  }
}

async function registerSearchEventHandlers(
  inputValue: string,
  movieService: MovieService
) {
  if (!validateSearchInput(inputValue)) return;
  const sentinel = document.getElementById("sentinel") as ObserverHTMLElement;
  if (sentinel && sentinel.observer) {
    sentinel.observer.disconnect();
  }
  clearMoviesContainer();
  removeHeader();
  showSkeleton(20);

  const movies = await fetchSearchMovies(inputValue, movieService);
  const movieList = new MovieList(movies.results);
  const searchFetchCallback = () => fetchSearchMovies(inputValue, movieService);
    
  ContentsContainer(`"${inputValue}" 검색 결과`, movieList);
  setupInfiniteScroll(searchFetchCallback, movieService);
}

export default registerSearchEventHandlers;
