import type { Movie } from "../types/Movie.ts";

const posterBaseURL = "https://image.tmdb.org/t/p/original/";

export const createMovieItemHTML = (movie: Movie): HTMLLIElement => {
  const posterSrc = `${posterBaseURL}${movie.poster_path}`;

  const li = document.createElement("li");
  li.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div class="item skeleton">
      <div class="skeleton-poster"></div>
      <img class="thumbnail" src="${posterSrc}" alt="영화 포스터 사진" />
      <div class="item-desc">
        <div class="skeleton-rate"></div>
        <div class="skeleton-title"></div>
        <p class="rate">
          <img src="./images/star_empty.png" class="star"/><span>${movie.vote_average}</span>
        </p>
        <strong>${movie.title}</strong>
      </div>
    </div>`,
  );

  return li;
};

export const createBannerHTML = (movie: Movie): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div class="rate">
      <img src="./images/star_empty.png" class="star" />
      <span class="rate-value">${movie.vote_average}</span>
    </div>
    <div class="title">${movie.title}</div>
    <button class="primary detail">자세히 보기</button>
  `,
  );

  return div;
};

export const createSearchHeaderHTML = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
  <div class="background-container search-header">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <div class="header-top">
        <h1 class="logo">
          <a href="/"><img src="./images/logo.png" alt="MovieList" /></a>
        </h1>
        <div class="search-bar">
          <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
          <button class="search-button">
            <img src="./images/search_icon.png" alt="검색" class="search-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `,
  );

  return div;
};

export const createNoResultHTML = (): HTMLDivElement => {
  const div = document.createElement("div");
  div.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
  <div id="no-result">
    <img src="./images/planet_icon.png" alt="검색 결과 없음" class="no-result-icon" />
    <p class="no-result-text">검색 결과가 없습니다.</p>
  </div>`,
  );

  return div;
};
