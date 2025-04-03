import { fetchMovieDetail } from "../../APIs/movieAPI.js";
import { ERROR_MESSAGES } from "../../constants/config.js";
import store from "../../store/store.js";
import { DetailModalRender, DetailModalMount } from "./index.js";

export async function openDetailModal(movieId) {
  try {
    const movieDetail = await fetchMovieDetail(movieId);
    if (!movieDetail) return;

    const modalHTML = DetailModalRender(movieDetail);
    document.body.insertAdjacentHTML("beforeend", modalHTML);

    DetailModalMount();
  } catch (error) {
    store.setErrorMessage(ERROR_MESSAGES.MOVIE_FETCH_FAILED);
  }
}
