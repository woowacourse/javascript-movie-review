import {
  fetchDefaultMovieList,
  fetchSearchMovieList,
} from "../service/movieApi.ts";
import {
  getElement,
  getInputElement,
  getUListElement,
} from "../view/getElementView.ts";
import { addMovieList } from "../view/movieListView.ts";

const displayMovieBySearch = async (
  movieDisplay: HTMLUListElement,
  pageNum: number,
) => {
  const searchBar = getInputElement(".search-bar");

  const searchBarText = searchBar.value;
  const background = getElement(".background-container");
  background.hidden = true;

  const description = getElement(".page-title");

  let movieList;

  if (searchBarText === "") {
    background.hidden = false;
    pageNum = 1;
    movieDisplay.replaceChildren();

    movieList = await fetchDefaultMovieList(pageNum);

    description.textContent = "지금 인기 있는 영화";
  } else {
    movieDisplay.replaceChildren();
    movieList = await fetchSearchMovieList(searchBarText);

    description.textContent = `'${searchBarText}' 검색 결과`;

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

export const bindSearchEvents = (pageNum: number) => {
  const movieDisplay = getUListElement(".thumbnail-list");

  // 엔터키 이벤트
  const searchBar = getInputElement(".search-bar");
  searchBar.addEventListener("keydown", async (event) => {
    if (event.key === "Enter") {
      displayMovieBySearch(movieDisplay, pageNum);
    }
  });

  // 검색 버튼 '클릭'
  const searchBtn = document.querySelector(".search-btn");
  searchBtn?.addEventListener("click", async () => {
    displayMovieBySearch(movieDisplay, pageNum);
  });
};

// 더 보기 버튼'
export const bindMoreMovieEvents = (pageNum: number) => {
  const movieDisplay = getUListElement(".thumbnail-list");

  const displayMoreBtn = document.querySelector(".display-more-btn");
  displayMoreBtn?.addEventListener("click", async () => {
    pageNum++;

    const movieList = await fetchDefaultMovieList(pageNum);

    // 영화 20개
    addMovieList(movieDisplay, movieList);
  });
};
