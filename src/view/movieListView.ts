import logo from "../../templates/images/logo.png";
import posterError from "../../templates/images/poster_error.png";

import { Movie } from "../types";
import { getElement } from "./getElementView";

import star_filled from "../../templates/images/star_filled.png";
import star_empty from "../../templates/images/star_empty.png";

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

export const showDetailModal = (movieDetail: Movie) => {
  const modalBackground = getElement(".modal-background", HTMLElement);
  modalBackground.classList.add("active");

  // 속성 값 변경
  const poster = getElement(".modal-image > img", HTMLImageElement);
  poster.src = movieDetail.poster_path
    ? `https://image.tmdb.org/t/p/w500${movieDetail.poster_path}`
    : posterError;

  const title = getElement(".modal-description h2", HTMLElement);
  title.textContent = movieDetail.title ?? "제목 없음";

  const category = getElement(".modal-description .category", HTMLElement);
  category.textContent = `${movieDetail.release_date.slice(0, 4) ?? "개봉 년도 없음"} · ${
    movieDetail.genres.map((genre) => genre.name).join(", ") ?? "장르 없음"
  }`;

  const rate = getElement(".rate_average", HTMLElement);
  rate.textContent = `${movieDetail.vote_average.toFixed(1) ?? 0}`;

  const starContainer = getElement(".star-container", HTMLElement);
  starContainer.setAttribute("data-movie-id", String(movieDetail.id));

  const detail = getElement(".detail", HTMLElement);
  detail.textContent = movieDetail.overview ?? "상세 설명 없음";

  modalBackground
    .querySelector(".close-modal")
    ?.addEventListener("click", () => {
      hideDetailModal();
    });
  addEventListener("keydown", (event) => {
    if (event.key === "Escape") hideDetailModal();
  });

  // 스크롤 금지
  document.body.classList.add("stop-scrolling");
};
export const hideDetailModal = () => {
  const modalBackground = getElement(".modal-background", HTMLElement);
  modalBackground.classList.remove("active");

  // 스크롤 허용
  document.body.classList.remove("stop-scrolling");
};

export const renderUserRate = (movieId: number, userRate: number) => {
  const ratingContainer = getElement(
    `.star-container[data-movie-id="${movieId}"]`,
    HTMLElement,
  );

  const stars = ratingContainer.querySelectorAll(".star");

  stars.forEach((star) => {
    if (!(star instanceof HTMLImageElement)) return;

    const value = Number(star.getAttribute("value"));
    const isActive = value <= userRate;

    // star.classList.toggle("is-active", isActive);
    star.src = isActive ? star_filled : star_empty;
  });
};

export const showBackgroundMovieInfo = (movie: Movie) => {
  const background = getElement(".background-container", HTMLElement);
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
                <img src="${star_empty}" class="star" />
                <span class="rate-value">${movie.vote_average ? movie.vote_average.toFixed(1) : 0}</span>
              </div>
              <div class="title">${movie.title}</div>
            </div> 
          </div>
  `;
};
