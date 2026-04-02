import { State } from "../main.ts";
import {
  fetchDefaultMovieList,
  fetchSearchMovieList,
} from "../service/movieApi.ts";
import {
  getElement,
  getInputElement,
  getUListElement,
} from "../view/getElementView.ts";
import {
  addMovieList,
  addMovieSkeletonUIList,
  removeMovieSkeletonUIList,
} from "../view/movieListView.ts";

const displayMovieBySearch = async (
  movieDisplay: HTMLUListElement,
  state: State,
) => {
  const searchBar = getInputElement(".search-bar");

  state.searchBarText = searchBar.value;
  const background = getElement(".background-container");
  background.hidden = true;

  const description = getElement(".page-title");

  let movieList;

  if (state.searchBarText === "") {
    background.hidden = false;
    state.pageNum = 1;
    movieDisplay.replaceChildren();
    addMovieSkeletonUIList(movieDisplay);

    movieList = await fetchDefaultMovieList(state.pageNum);

    removeMovieSkeletonUIList(movieDisplay);

    description.textContent = "지금 인기 있는 영화";
  } else {
    movieDisplay.replaceChildren();
    addMovieSkeletonUIList(movieDisplay);

    movieList = await fetchSearchMovieList(state.pageNum, state.searchBarText);

    removeMovieSkeletonUIList(movieDisplay);

    description.textContent = `'${state.searchBarText}' 검색 결과`;

    // 검색 결과가 없을 때
    const searchError = getElement(".search-error-container");

    if (movieList.length === 0) {
      searchError.hidden = false;
    } else {
      searchError.hidden = true;
    }
  }

  // 영화 20개
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

    let movieList;
    if (state.searchBarText === "") {
      movieList = await fetchDefaultMovieList(state.pageNum);
    } else {
      movieList = await fetchSearchMovieList(
        state.pageNum,
        state.searchBarText,
      );
    }

    // 영화 20개
    removeMovieSkeletonUIList(movieDisplay);
    addMovieList(movieDisplay, movieList);
  });
};
