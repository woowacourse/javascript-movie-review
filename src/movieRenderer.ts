import { fetchMovies, fetchSearchedMovies } from "./movieAPIResponse.ts";
import type { Movie } from "../types/Movie.ts";
import {
  createMovieItemHTML,
  createBannerHTML,
  createSearchHeaderHTML,
  createNoResultHTML,
} from "./createHtml.ts";

const bannerBaseURL = "https://image.tmdb.org/t/p/w1920_and_h800_multi_faces";

export const renderMovies = async (moviePageCount: number) => {
  const movieData = await fetchMovies(moviePageCount);
  if (moviePageCount === 1) {
    renderBanner(movieData.results[0]);
  }
  const list = document.querySelector(".thumbnail-list");

  movieData.results.forEach((movie: Movie) => {
    const li = createMovieItemHTML(movie);
    attachSkeletonEvents(li);
    list?.appendChild(li);
  });

  return movieData.total_pages;
};

const attachSkeletonEvents = (li: HTMLLIElement) => {
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
      img.src = "./images/no_image.png";
      removeSkeleton();
    },
    { once: true },
  );
};

export const renderBanner = async (fristMovieData: Movie) => {
  const banner = document.querySelector(".top-rated-movie");
  const backgroundContainer = document.querySelector(".background-container");

  if (backgroundContainer) {
    (backgroundContainer as HTMLElement).style.backgroundImage =
      `url("${bannerBaseURL + fristMovieData.backdrop_path}")`;
  }

  banner?.appendChild(createBannerHTML(fristMovieData));
};

export const replaceBanner = (header: HTMLElement, searchKeyword: string) => {
  const searchHeader = createSearchHeaderHTML();
  header.appendChild(searchHeader);

  const input = header.querySelector<HTMLInputElement>(".search-input");
  if (input) input.value = searchKeyword;
};

export const renderSearchedMovies = async (
  searchKeyword: string,
  searchPageCount: number,
) => {
  const movieData = await fetchSearchedMovies(searchKeyword, searchPageCount);
  const movies = movieData.results;

  const list = document.querySelector(".thumbnail-list");

  if (list && movies.length === 0 && searchPageCount === 1) {
    list.appendChild(createNoResultHTML());
  }

  movies.forEach((movie: Movie) => {
    const li = createMovieItemHTML(movie);
    attachSkeletonEvents(li);
    list?.appendChild(li);
  });

  return movieData.total_pages;
};
