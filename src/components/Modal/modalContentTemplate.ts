import { fetchMovieDetail } from "../../APIs/movieAPI";
import { Rating, attachRatingEvents } from "./Rating";
import Store from "../../store/store";
import { getCurrentScore } from "../../utils/utils";

const modalContentTemplate = async (
  id: string,
  store: Store
): Promise<string> => {
  const movie = await fetchMovieDetail(id, (error: Error) =>
    alert(error.message)
  );
  const ratingHTML = Rating(getCurrentScore(id, store));
  const contentHTML = `
    <div class="modal-image">
      <div class="skeleton-detail-thumbnail"></div>
      <img src="${
        movie.poster_path
          ? import.meta.env.VITE_TMDB_API_BANNER_URL + movie.poster_path
          : "./images/logo.png"
      }" alt="${movie.title}" class="detail-thumbnail" />
    </div>
    <div class="modal-description" data-testid="modal">
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
      <p class="detail">${movie.overview || "줄거리 정보가 없습니다."}</p>
    </div>
  `;
  setTimeout(() => {
    attachRatingEvents(id, store);
  }, 0);
  return contentHTML;
};

export default modalContentTemplate;
