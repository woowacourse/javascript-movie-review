import { Movie, Movies } from "../services/dto";

import { handleDetail } from "../main";

import { removeMoreButton, renderMoreButton } from "./moreButton";

const createMovieNode = (movie: Movie): DocumentFragment | null => {
  const movieTemplate =
    document.querySelector<HTMLTemplateElement>(`#movie-template`);
  if (!movieTemplate) return null;

  const movieFragment = movieTemplate.content.cloneNode(
    true,
  ) as DocumentFragment;

  const movieItem = movieFragment.querySelector("li");
  if (!movieItem) return null;
  movieItem.dataset.movieId = String(movie.id);

  const thumbnail = movieFragment.querySelector<HTMLImageElement>(".thumbnail");
  if (!thumbnail) return null;

  const BASE_URL = `https://media.themoviedb.org/t/p/w220_and_h330_face`
  const FALLBACK = './images/no_image.png';

  thumbnail.src = movie.poster_path ? BASE_URL + movie.poster_path: FALLBACK;
  thumbnail.onerror = () => {
    thumbnail.src = FALLBACK;
  }
  thumbnail.alt = movie.title;

  thumbnail.addEventListener('click', () => {
    handleDetail(movie.id);
  });

  const itemDesc = movieFragment.querySelector(".item-desc");

  const rate = itemDesc?.querySelector("span");
  if (!rate) return null;
  rate.textContent = movie.vote_average.toString();

  const title = itemDesc?.querySelector("strong");
  if (!title) return null;
  title.textContent = movie.title;

  return movieFragment;
};

export const renderMovieList = (movies: Movies): void => {
  const movieList = document.querySelector("#movie-list");

  movies.results.forEach((movie: Movie) => {
    const movieNode = createMovieNode(movie);
    if (movieNode) {
      movieList?.appendChild(movieNode);
    }
  });

  if (movies.page === movies.total_pages) {
    removeMoreButton();
  } else {
    renderMoreButton();
  }
};

export const renderNoResult = () => {
  const noResult = document.querySelector("#no-result");
  if (!noResult) return;
  const empty = /* html */ `
  <p class="message-box">
    <img src="./images/mascot.png" alt="" />
    <span>검색 결과가 없습니다.</span>
  </p>`;
  noResult.innerHTML = empty;

  removeMoreButton();
};

export const removeMovieList = () => {
  const movieList = document.querySelector<HTMLDivElement>("#movie-list");
  if (!movieList) return;

  const noResult = document.querySelector("#no-result");
  if (!noResult) return;

  movieList.replaceChildren();
  noResult.replaceChildren();
};
