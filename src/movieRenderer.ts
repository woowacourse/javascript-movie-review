import { fetchMovies, fetchSearchedMovies } from "./movieAPIResponse.ts";
import type { Movie } from "../types/Movie.ts";

export const renderMovies = async (moviePageCount: number) => {
  const movieData = await fetchMovies(moviePageCount);
  const movies = movieData.results;

  const list = document.querySelector(".thumbnail-list");
  const posterBaseURL = "https://image.tmdb.org/t/p/original/";

  movies.forEach((movie: Movie) => {
    const posterSrc = `${posterBaseURL}${movie.poster_path}`;

    const li = `<li>
              <div class="item">
                <img class="thumbnail"
                  src="${posterSrc}" 
                  alt="영화 포스터 사진"
                  onerror="this.onerror=null; this.src='/images/no_image.png'" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="/images/star_empty.png" class="star" /><span>${movie.vote_average}</span>
                  </p>
                  <strong>${movie.title}</strong>
                </div>
              </div>
            </li>`;
    list?.insertAdjacentHTML("beforeend", li);
  });

  return getTotalPages(movieData);
};

export const renderBanner = async () => {
  const movieData = await fetchMovies(1);
  const movies = movieData.results;

  const banner = document.querySelector(".top-rated-movie");
  const backgroundContainer = document.querySelector(".background-container");
  const bannerBaseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

  const mostPopularMovie = movies[0];

  if (backgroundContainer) {
    (backgroundContainer as HTMLElement).style.backgroundImage =
      `url("${bannerBaseURL + mostPopularMovie.backdrop_path}")`;
  }

  const mostPopularMovieBanner = `
            <div class="rate">
              <img src="/images/star_empty.png" class="star" />
              <span class="rate-value">${mostPopularMovie.vote_average}</span>
            </div>
            <div class="title">${mostPopularMovie.title}</div>
            <button class="primary detail">자세히 보기</button>
            `;

  banner?.insertAdjacentHTML("beforeend", mostPopularMovieBanner);
};

export const replaceBanner = (header: any, searchKeyword: string) => {
  const searchBar = `<div class="search-bar">
                <input type="text" class="search-input" value="${searchKeyword}" placeholder="검색어를 입력하세요" />
              <button class="search-button">&#128269;</button>
             </div>
             <h1 class="logo">
              <img src="/images/logo.png" alt="MovieList" />
             </h1>`;
  header.insertAdjacentHTML("beforeend", searchBar);
};

export const renderSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  const movieData = await fetchSearchedMovies(searchKeyword, searchPageCount);
  const movies = movieData.results;

  const list = document.querySelector(".thumbnail-list");
  const posterBaseURL = "https://image.tmdb.org/t/p/original/";

  if (list) {
    const noResultDiv = `<div>검색 결과가 없습니다.</div>`;
    if (movies.length === 0 && searchPageCount === 1)
      list.insertAdjacentHTML("beforeend", noResultDiv);
  }

  movies.forEach((movie: Movie) => {
    const posterSrc = `${posterBaseURL}${movie.poster_path}`;

    const li = `<li>
              <div class="item">
                <img class="thumbnail"
                  src="${posterSrc}"
                  onerror="this.onerror=null; this.src='/images/no_image.png'" />
                <div class="item-desc">
                  <p class="rate">
                    <img src="/images/star_empty.png" class="star" /><span>${movie.vote_average}</span>
                  </p>
                  <strong>${movie.title}</strong>
                </div>
              </div>
            </li>`;
    if (list) {
      list.insertAdjacentHTML("beforeend", li);
    }
  });
  return getTotalPages(movieData);
};

const getTotalPages = (movieData: { total_pages: number }) => {
  return movieData.total_pages;
};
