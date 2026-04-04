import { State } from "../main.ts";
import { fetchMovieList } from "../service/movieApi.ts";
import {
  getElement,
  getInputElement,
  getUListElement,
} from "../view/getElementView.ts";
import {
  addMovieList,
  addMovieSkeletonUIList,
  Movie,
  removeMovieSkeletonUIList,
  showBackgroundMovieInfo,
} from "../view/movieListView.ts";

const displayMovieBySearch = async (
  movieDisplay: HTMLUListElement,
  state: State,
) => {
  // 검색어 입력 후 state에 갱신
  const searchBar = getInputElement(".search-bar");
  state.searchBarText = searchBar.value;

  const background = getElement(".background-container");
  background.hidden = true;

  const description = getElement(".page-title");

  movieDisplay.replaceChildren();
  state.pageNum = 1;

  if (state.searchBarText === "") {
    background.hidden = false;
    description.textContent = "지금 인기 있는 영화";
  } else {
    description.textContent = `'${state.searchBarText}' 검색 결과`;
  }

  addMovieSkeletonUIList(movieDisplay);
  const path = state.searchBarText === "" ? "/movie/popular" : "/search/movie";
  const movieList = await fetchMovieList(
    path,
    state.pageNum,
    state.searchBarText,
  );

  // 검색 결과가 없을 때
  const searchError = getElement(".search-error-container");

  if (movieList.length === 0) {
    searchError.hidden = false;
  } else {
    searchError.hidden = true;
  }

  removeMovieSkeletonUIList(movieDisplay);
  addMovieList(movieDisplay, movieList);
};

export const bindSearchEvents = (state: State) => {
  const movieDisplay = getUListElement(".thumbnail-list");

  // 엔터키 이벤트
  const searchBar = getInputElement(".search-bar");
  searchBar.addEventListener("keydown", async (event) => {
    if (event.isComposing) return;

    if (event.key === "Enter") {
      displayMovieBySearch(movieDisplay, state);
    }
  });

  // 검색 버튼 '클릭'
  const searchBtn = document.querySelector(".search-btn");
  searchBtn?.addEventListener("click", async () => {
    displayMovieBySearch(movieDisplay, state);
  });
};

// 더 보기 버튼
export const bindMoreMovieEvents = (state: State) => {
  const movieDisplay = getUListElement(".thumbnail-list");

  const displayMoreBtn = document.querySelector(".display-more-btn");
  displayMoreBtn?.addEventListener("click", async () => {
    state.pageNum++;

    addMovieSkeletonUIList(movieDisplay);
    const path =
      state.searchBarText === "" ? "/movie/popular" : "/search/movie";
    const movieList = await fetchMovieList(
      path,
      state.pageNum,
      state.searchBarText,
    );
    removeMovieSkeletonUIList(movieDisplay);
    addMovieList(movieDisplay, movieList);
  });
};

// 포스터 클릭 이벤트
export const bindClickPosterEvent = (state: State) => {
  // 1. 모든 포스터 엘리먼트 가져오기
  const thumbnailBox = getElement(".thumbnail-list");

  thumbnailBox.addEventListener("click", async (event: MouseEvent) => {
    // 검색 기능이 활성화된 상태에서는 return
    if (state.searchBarText !== "") return;

    const target = event.target as HTMLElement;
    const item = target.closest(".item") as HTMLElement;
    const titleElement = item.querySelector("strong");

    const path =
      state.searchBarText === "" ? "/movie/popular" : "/search/movie";
    const movieList = await fetchMovieList(
      path,
      state.pageNum,
      state.searchBarText,
    );

    const backgroundMovie = movieList.filter(
      (movie: Movie) => movie.title === titleElement?.textContent,
    )[0];
    showBackgroundMovieInfo(backgroundMovie);
  });
};
