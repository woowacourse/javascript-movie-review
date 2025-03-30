import { getSearchParam } from "../apis/config";
import MovieList from "../domains/MovieList";
import MovieService from "../services/MovieService";
import { ContentsContainer } from "./Contents";
import { replaceSkeletonWithMovies, showSkeleton } from "./Contents";

function validateSearchInput(inputValue) {
  if (inputValue.trim() === "") {
    alert("검색어를 입력해주세요.");
    return false;
  }
  return true;
}

// 헤더 제거: 존재하면 헤더를 제거
function removeHeader() {
  const $header = document.querySelector("header");
  if ($header) {
    $header.remove();
  }
}

// 영화 컨테이너 초기화: 해당 컨테이너의 innerHTML 비우기
function clearMoviesContainer() {
  const $moviesContainer = document.getElementById("movies-container");
  if ($moviesContainer) {
    $moviesContainer.innerHTML = "";
  }
}

// 영화 검색 API 호출
async function fetchSearchMovies(inputValue, movieService) {
  return await movieService.fetchMovies(
    "/search/movie",
    getSearchParam(inputValue, movieService.currentPage)
  );
}

// 콘텐츠 업데이트: 검색 결과 제목과 영화 리스트를 ContentsContainer를 통해 업데이트
function updateContentsContainer(inputValue, movieList, movieService) {
  ContentsContainer(`"${inputValue}" 검색 결과`, movieList, movieService, () =>
    movieService.fetchMovies(
      "/search/movie",
      getSearchParam(inputValue, movieService.currentPage)
    )
  );
}

async function registerSearchEventHandlers(inputValue, movieService) {
  if (!validateSearchInput(inputValue)) return;
  removeHeader();
  clearMoviesContainer();
  showSkeleton(10);
  const movies = await fetchSearchMovies(inputValue, movieService);
  const movieList = new MovieList(movies.results);
  replaceSkeletonWithMovies(movieList.movieList);

  updateContentsContainer(inputValue, movieList, movieService);
}

export default registerSearchEventHandlers;
