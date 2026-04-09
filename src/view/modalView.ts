import { Movie } from "../types";
import { getElement } from "./getElementView";
import posterError from "../../templates/images/poster_error.png";

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
  detail.textContent = movieDetail.overview
    ? movieDetail.overview
    : "상세 설명 없음";

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
