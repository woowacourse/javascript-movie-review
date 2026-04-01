const html = String.raw;

import modal from "../templates/modal.html?raw";
import "../templates/styles/index.css";

import { Movie, addMovieList } from "./view/movieListView.ts";
import {
  fetchDefaultMovieList,
  fetchSearchMovieList,
} from "./service/movieApi.ts";
import {
  getElement,
  getInputElement,
  getUListElement,
} from "./view/getElementView.ts";

addEventListener("load", async () => {
  const app = document.querySelector("#app");

  if (app) {
    app.innerHTML = modal;
    let pageNum = 1;

    let movieList = await fetchDefaultMovieList(pageNum);

    const movieDisplay = getUListElement(".thumbnail-list");

    addMovieList(movieDisplay, movieList);

    // 엔터키 이벤트
    const searchBar = getInputElement(".search-bar");
    searchBar.addEventListener("keydown", async (event) => {
      if (event.key === "Enter") {
        const searchBarText = searchBar.value;
        const background = getElement(".background-container");

        background.hidden = true;

        if (searchBarText === "") {
          background.hidden = false;
          pageNum = 1;
          movieDisplay.replaceChildren();

          movieList = await fetchDefaultMovieList(pageNum);
        } else {
          movieDisplay.replaceChildren();
          movieList = await fetchSearchMovieList(searchBarText);

          const description = getElement("h2");
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
      }
    });

    // 더 보기 버튼
    const displayMoreBtn = document.querySelector(".display-more-btn");
    displayMoreBtn?.addEventListener("click", async () => {
      pageNum++;

      movieList = await fetchDefaultMovieList(pageNum);

      // 영화 20개
      addMovieList(movieDisplay, movieList);
    });

    // 검색 버튼 '클릭'
    const searchBtn = document.querySelector(".search-btn");
    searchBtn?.addEventListener("click", async () => {
      const searchBar = getInputElement(".search-bar");

      const searchBarText = searchBar.value;
      const background = getElement(".background-container");
      background.hidden = true;

      const description = getElement("h2");

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
    });
  }
});
