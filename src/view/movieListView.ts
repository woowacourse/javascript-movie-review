import { Movie } from "../types";
import { getElement } from "./getElementView";

import star_empty from "../../templates/images/star_empty.png";
import posterError from "../../templates/images/poster_error.png";

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
        src=${movie.poster_path ? `https://image.tmdb.org/t/p/w500${movie.poster_path}` : posterError}
        alt=${movie.title}
      />
      <div class="item-desc">
        <p class="rate">
          <img class="star" src="${star_empty}" />
          <span class="vote-average">${movie.vote_average ? movie.vote_average.toFixed(1) : 0}</span>
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
  const voteAverage = getElement(".rate-value", HTMLElement);
  voteAverage.textContent = movie.vote_average
    ? movie.vote_average.toFixed(1)
    : "0";

  const title = getElement(".title", HTMLElement);
  title.textContent = movie.title;

  const img = getElement(".overlay > img", HTMLImageElement);
  img.src = `https://image.tmdb.org/t/p/w500${movie.backdrop_path}`;
};
