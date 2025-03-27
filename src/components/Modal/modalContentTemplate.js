// modalContentTemplate.js
import { fetchMovieDetail } from "../../APIs/movieAPI";
import { Rating, attachRatingEvents } from "./Rating.js";

export const ratingTemplate = (id, store) => {
  const scores = store.getState().starRatings || [];
  const currentScore = scores.find((rating) => rating.id === id)?.score || 0;
  return Rating(id, store, currentScore);
};

const modalContentTemplate = async (id, store) => {
  const movie = await fetchMovieDetail(id, (error) => alert(error.message));
  const ratingHTML = ratingTemplate(id, store);
  const contentHTML = /* html */ `
    <div class="modal-image">
      <div class="skeleton-detail-thumbnail"></div>
      <img src="${
        movie.poster_path
          ? import.meta.env.VITE_TMDB_API_BANNER_URL + movie.poster_path
          : "./images/logo.png"
      }" alt="${movie.title}" class="detail-thumbnail" />
    </div>
    <div class="modal-description">
      <div class="description-information">
        <h2>${movie.title}</h2>
        <p class="category">${movie.release_date.slice(
          0,
          4
        )} · ${movie.genres.join(", ")}</p>
        <p class="rate">
          <span class="label">평균</span>
          <img src="./images/star_filled.png" class="star" /><span>${
            movie.vote_average
          }</span>
        </p>
      </div>
      <hr />
      <p class="subtitle">내 별점</p>
      <div id="modal-rating">${ratingHTML}</div>
      <hr />
      <p class="subtitle">줄거리</p>
      <p class="detail">${movie.overview}</p>
    </div>
  `;
  // 별점 이벤트 등록 (한 번 초기화)
  setTimeout(() => {
    attachRatingEvents(id, store);
  }, 0);
  return contentHTML;
};

export default modalContentTemplate;
