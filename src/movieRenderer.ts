import { fetchMovies, fetchSearchedMovies } from "./movieAPIResponse.ts";
import type { Movie } from "../types/Movie.ts";
import type { MovieResponse } from "../types/MovieResponse";

const posterBaseURL = "https://image.tmdb.org/t/p/original/";
const base = import.meta.env.BASE_URL;

const createMovieItem = (movie: Movie): HTMLLIElement => {
  const posterSrc = `${posterBaseURL}${movie.poster_path}`;

  const li = document.createElement("li");

  li.insertAdjacentHTML(
    "beforeend",
    /*html*/ `
    <div id="movie-item" data-id = "${movie.id}">
      <div class="item skeleton">
        <div class="skeleton-poster"></div>
        <img class="thumbnail" src="${posterSrc}" alt="영화 포스터 사진" />
        <div class="item-desc">
          <div class="skeleton-rate"></div>
          <div class="skeleton-title"></div>
          <p class="rate">
            <img src="${base}images/star_empty.png" class="star"/><span>${movie.vote_average}</span>
          </p>
          <strong>${movie.title}</strong>
        </div>
      </div>
    </div>`,
  );

  const img = li.querySelector<HTMLImageElement>(".thumbnail")!;
  const removeSkeleton = () => {
    li.querySelector(".item")?.classList.remove("skeleton");
    li.querySelector(".skeleton-poster")?.remove();
    li.querySelector(".skeleton-rate")?.remove();
    li.querySelector(".skeleton-title")?.remove();
  };

  img.addEventListener("load", removeSkeleton, { once: true });
  img.addEventListener(
    "error",
    () => {
      img.src = `${base}images/no_image.png`;
      removeSkeleton();
    },
    { once: true },
  );

  img.src = posterSrc;

  return li;
};

export const renderMovies = async (moviePageCount: number) => {
  try {
    const movieData: MovieResponse = await fetchMovies(moviePageCount);

    if (moviePageCount === 1) {
      renderBanner(movieData.results[0]);
    }
    const list = document.querySelector(".thumbnail-list");

    movieData.results.forEach((movie: Movie) => {
      list?.appendChild(createMovieItem(movie));
    });

    return movieData.total_pages;
  } catch {
    alert("인기 영화를 불러오는 데 실패했습니다. 잠시 후 다시 시도해 주세요.");
    return 0;
  }
};

export const renderBanner = async (fristMovieData: Movie) => {
  const movies = fristMovieData;

  const banner = document.querySelector(".top-rated-movie");
  const backgroundContainer = document.querySelector(".background-container");
  const bannerBaseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

  const mostPopularMovie = movies;

  if (backgroundContainer) {
    (backgroundContainer as HTMLElement).style.backgroundImage =
      `url("${bannerBaseURL + mostPopularMovie.backdrop_path}")`;
  }

  const mostPopularMovieBanner = /*html*/ `
    <div class="rate">
      <img src="${base}images/star_empty.png" class="star" />
      <span class="rate-value">${mostPopularMovie.vote_average}</span>
    </div>
    <div class="title">${mostPopularMovie.title}</div>
    <button class="primary detail" data-id = "${fristMovieData.id}">자세히 보기</button>
    `;

  banner?.insertAdjacentHTML("beforeend", mostPopularMovieBanner);
};

export const replaceBanner = (header: HTMLElement, searchKeyword: string) => {
  const searchBar = /*html*/ `
  <div class="background-container search-header">
    <div class="overlay" aria-hidden="true"></div>
    <div class="top-rated-container">
      <div class="header-top">
        <h1 class="logo">
          <a href="/"><img src="${base}images/logo.png" alt="MovieList" /></a>
        </h1>
        <div class="search-bar">
          <input type="text" class="search-input" placeholder="검색어를 입력하세요" />
          <button class="search-button">
            <img src="${base}images/search_icon.png" alt="검색" class="search-icon" />
          </button>
        </div>
      </div>
    </div>
  </div>
  `;

  header.insertAdjacentHTML("beforeend", searchBar);

  const input = header.querySelector<HTMLInputElement>(".search-input");
  if (input) input.value = searchKeyword;
};

export const renderSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  try {
    const movieData: MovieResponse = await fetchSearchedMovies(
      searchKeyword,
      searchPageCount,
    );
    const movies = movieData.results;

    const list = document.querySelector(".thumbnail-list");

    if (list && movies.length === 0 && searchPageCount === 1) {
      list.insertAdjacentHTML(
        "beforeend",
        /*html*/ `
      <div id="no-result">
        <img src="${base}images/planet_icon.png" alt="검색 결과 없음" class="no-result-icon" />
        <p class="no-result-text">검색 결과가 없습니다.</p>
      </div>`,
      );
    }

    movies.forEach((movie: Movie) => {
      list?.appendChild(createMovieItem(movie));
    });

    return movieData.total_pages;
  } catch {
    alert("영화 검색에 실패했습니다. 잠시 후 다시 시도해 주세요.");
    return 0;
  }
};
