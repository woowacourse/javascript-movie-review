import logo from "../../templates/images/logo.png";
import starEmpty from "../../templates/images/star_empty.png";
import { Movie, State } from "../types";
import { getElement } from "./getElementView";

export const addMovieList = (
  movieDisplay: HTMLUListElement,
  movieList: Movie[],
) => {
  movieList.forEach((movie: Movie) => {
    const li = document.createElement("li");

    li.innerHTML = /*html*/ ` 
    <div class="item" >
      <img
        class="thumbnail"
        src="https://image.tmdb.org/t/p/w500${movie.poster_path}"
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${starEmpty}" />
          <span class="vote-average">${movie.vote_average.toFixed(1)}</span>
        </p>
        <strong class="title">${movie.title}</strong>
      </div>
    </div>`;

    movieDisplay.appendChild(li);
  });
};

export const addMovieSkeletonUIList = (
  movieDisplay: HTMLUListElement,
  count: number = 20,
) => {
  Array.from({ length: count }, () => {
    const li = document.createElement("li");
    li.className = "skeleton-li";

    li.innerHTML = /*html*/ ` 
    <div class="skeleton-item">
      <div class="square"></div>
      <div class="first-line"></div>
        <div class="second-line"></div>
    </div>`;

    movieDisplay.appendChild(li);
  });
};
export const removeMovieSkeletonUIList = (movieDisplay: HTMLUListElement) => {
  movieDisplay.querySelectorAll(".skeleton-li").forEach((it) => it.remove());
};

export const showBackgroundMovieInfo = (movie: Movie) => {
  const background = getElement(".background-container");
  background.innerHTML = /*html*/ `
          <div class="overlay" aria-hidden="true">
           <img src="https://image.tmdb.org/t/p/w500${movie.backdrop_path}" alt="영화 이미지" />
          </div>
          <div class="top-rated-container">
            <h1 class="logo">
              <img src="${logo}" alt="MovieList" />
            </h1>
            <div class="top-rated-movie">
              <div class="rate">
                <img src="${starEmpty}" class="star" />
                <span class="rate-value">${movie.vote_average.toFixed(1)}</span>
              </div>
              <div class="title">${movie.title}</div>
            </div> 
          </div>
  `;
};

export const hideSearchErrorText = () => {
  const searchError = getElement(".search-error-container");
  searchError.textContent = "";
  searchError.hidden = true;
};
export const showErrorText = (string: string) => {
  const searchError = getElement(".search-error-container");
  searchError.textContent = string;
  searchError.hidden = false;
};

export const updateTitleText = (state: State) => {
  const description = getElement(".page-title");
  const background = getElement(".background-container");

  if (state.searchBarText === "") {
    background.hidden = false;
    description.textContent = "지금 인기 있는 영화";
  } else {
    background.hidden = true;
    description.textContent = `'${state.searchBarText}' 검색 결과`;
  }
};
export const controlSearchResultText = (state: State) => {
  const searchError = getElement(".search-error-container");

  if (state.searchBarText !== "" && state.movieList.length === 0) {
    searchError.hidden = false;
    searchError.textContent = "검색 결과가 없습니다.";
    return;
  }

  searchError.hidden = true;
};
