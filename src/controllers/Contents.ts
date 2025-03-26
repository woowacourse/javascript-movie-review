import MovieService from "../services/MovieService.js";
import MovieList from "../domains/MovieList.js";
import Button from "../components/Button.js";
import { FetchMoviesCallback, MovieInfo } from "../../types/movieType.js";
import { setState, state } from "./Main.ts";


const MAXIMUM_PAGE = 500;

export function render() {
  const $moviesContainer = document.getElementById("movies-container");

  if (!$moviesContainer) return;


  if (state.isLoading) {
    $moviesContainer.style.display = "none";
  } else {
    if (state.movies.length % 20 > 0) {
      const $main = document.querySelector("main") as HTMLElement;
      removeMoreButton($main);
    }
    $moviesContainer.style.display = "block";
    const movieList = new MovieList(state.movies);
    const listContainer = movieList.renderMovieList();
    $moviesContainer.innerHTML = "";
    $moviesContainer.appendChild(listContainer);
  }
}

// 콘텐츠 헤더 렌더링 함수
function renderContentHeader($section: HTMLElement, contentTitle: string) {
  // 기존 헤더가 있다면 제거
  const existingHeader = $section.querySelector("h2");
  if (existingHeader) existingHeader.remove();

  const $h2 = document.createElement("h2");
  $h2.innerText = contentTitle;
  $section.prepend($h2); 
}

// "더 보기" 버튼 제거
function removeMoreButton($main:HTMLElement) {
  const existingButton = $main.querySelector("button.more");
  if (existingButton) {
    existingButton.remove();
  }
}

// 결과가 없을 경우 "검색 결과 없음" 메시지 렌더링
function renderNoResults($main: HTMLElement) {
  const existingContentContainer = document.querySelector(".contentContainer");
  if (existingContentContainer) {
    existingContentContainer.remove();
  }
  const $contentContainer = document.createElement("div");
  $contentContainer.classList.add("contentContainer");
  $contentContainer.innerHTML = `
        <img src="./no_results.png" alt="검색 결과 없음">
        <div>검색 결과가 없습니다.</div>
    `;
  $main.appendChild($contentContainer);
  removeMoreButton($main);
}

// "더 보기" 버튼 클릭 시 추가 영화 데이터를 불러와 상태 업데이트
async function handleMoreMovies(
  event: MouseEvent,
  movieService:MovieService,
  fetchMoviesCallback: FetchMoviesCallback
) {
  movieService.nextPage();
  const additionalData = await fetchMoviesCallback();

  // 기존 영화 데이터에 추가
  setState({ movies: state.movies.concat(additionalData.results) });

  const $moreButton = event.target as HTMLButtonElement;
  if (
    movieService.currentPage === MAXIMUM_PAGE) {
    $moreButton.remove();
  }
}


export function ContentsContainer(
  moviesResults: MovieInfo[],
  contentTitle: string,
  movieService:MovieService,
  fetchMoviesCallback: FetchMoviesCallback
) {
  const $main = document.querySelector("main") as HTMLElement;

  // 콘텐츠 헤더 렌더링
  renderContentHeader($main, contentTitle);

  // 시작 전 스켈레톤 UI 표시
  setState({ isLoading: true });

  // 로딩 완료 후 영화 데이터 업데이트
  setState({ isLoading: false, movies: moviesResults });

  removeMoreButton($main);

  if (state.movies.length === 0) {
    renderNoResults($main);
  } else {
    const $moreButton = Button("더 보기", "more", async (event: MouseEvent) => {
      await handleMoreMovies(event, movieService, fetchMoviesCallback);
    });
    $main.appendChild($moreButton);
  }

  if (state.movies.length < 20) {
    removeMoreButton($main);
  }
}