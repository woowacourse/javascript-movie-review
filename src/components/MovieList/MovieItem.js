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
            <img src="./images/star_empty.png" class="star" />
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
      if (movieId) {
        try {
          const movieDetail = await fetchMovieDetail(movieId);

          openDetailModal(movieDetail);
        } catch (error) {
          store.setState({
            ...store.getState(),
            errorMessage: ERROR_MESSAGES.MOVIE_FETCH_FAILED,
          });
        }
      }
    });
  });
}
