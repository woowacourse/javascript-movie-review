import { fetchSearchedMovies } from "./movieAPIResponse.ts";
import { createMovieItem, replaceBanner } from "./movieRenderer.ts";
import type { Movie } from "../types/Movie.ts";
import type { MovieResponse } from "../types/MovieResponse";

const base = import.meta.env.BASE_URL;

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

export const resetMovieList = () => {
  const list = document.querySelector(".thumbnail-list");
  if (list) list.replaceChildren();
};

export const replaceHeaderWithBanner = (keyword: string) => {
  const header = document.querySelector<HTMLElement>("#header");
  if (header) {
    header.replaceChildren();
    replaceBanner(header, keyword);
  }
};

export const replaceSectionTitle = (keyword: string) => {
  const sectionTitle = document.querySelector("#section-title");
  if (sectionTitle) {
    sectionTitle.textContent = `"${keyword}" 검색 결과`;
  }
};
