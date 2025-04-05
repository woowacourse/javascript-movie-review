import { DetailModalRender } from "../DetailModal/index.js";
import { fetchMovieDetail } from "../../APIs/movieAPI";
import { openDetailModal } from "../DetailModal/openDetailModal.js";
import { ERROR_MESSAGES } from "../../constants/config.js";

export function MovieItemRender({ id, poster_path, title, vote_average }) {
  const imageUrl = poster_path
    ? `${import.meta.env.VITE_TMDB_API_POSTER_URL}${poster_path}`
    : "./images/logo.png";

  return /* html */ `
    <li data-movie-id="${id}">
      <div class="item">
        <img class="thumbnail" src="${imageUrl}" alt="${title}" />
        <div class="item-desc">
          <p class="rate">
            <img class="star" src="./images/star_empty.png" alt="star" />
            <span>${vote_average}</span>
          </p>
          <strong>${title}</strong>
        </div>
      </div>
    </li>
  `;
}

export function MovieItemMount() {
  const $movieItems = document.querySelectorAll("li[data-movie-id]");

  $movieItems.forEach((item) => {
    item.addEventListener("click", async () => {
      const movieId = item.getAttribute("data-movie-id");
      openDetailModal(movieId);
    });
  });
}
