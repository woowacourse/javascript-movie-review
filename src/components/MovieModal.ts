import { HTTPError } from "../api/HTTPError";
import { StarFilled } from "../assets";
import { POSTER_BASE_URL } from "../constants";
import MovieList from "../domain/MovieList";
import { MovieDetail } from "../types/movie";
import { $ } from "../utils/domSelector";
import InvalidMessage from "./InvalidMessage";

const MovieModal = {
  loadMovieDetail: async () => {
    try {
      const movieDetail = await MovieList.getDetailedMovieData();
      MovieModal.render(movieDetail);
      MovieModal.bindClickEvent();
      MovieModal.bindPressEvent();
      MovieModal.bindGoBack();
    } catch (error) {
      if (error instanceof HTTPError) {
        InvalidMessage.renderErrorMessage(error.statusCode);
      }
    }
  },

  render: (movie: MovieDetail) => {
    const template = `
      <div id="modal-backdrop" class="modal-backdrop"/>
      <div class="movie-modal modal-container">
        <button class="modal-close">✕</button>
        <p class="modal-title">${movie.title}</p>
        <div id="${movie.id}" class="modal-sub-container">
          ${
            movie.poster_path
              ? `<img
              class="modal-poster"
              src="${POSTER_BASE_URL}${movie.poster_path}"
              loading="lazy"
              alt="${movie.title}"
            />`
              : `<div class="item-thumbnail placeholder-thumbnail"></div>`
          }
          <div class="modal-info-container">
            <div>
              <div class="info-header">
                <p class="modal-text" >${movie.genres
                  .map((genre) => genre.name)
                  .join(", ")}</p>
                <img class="modal-icon" src="${StarFilled}" alt="별점" />
                <p class="modal-text">${movie.vote_average}</p>
              </div>
              <p class="modal-text">${movie.overview}</p>
            </div>
            <div class="modal-score-box"></div>
          </div>
        </div>
      </div>
    `;
    $<HTMLElement>(".item-view").insertAdjacentHTML("beforeend", template);
  },

  bindClickEvent: () => {
    $<HTMLDivElement>("#modal-backdrop").addEventListener(
      "click",
      (event: Event) => {
        if (event.target == $<HTMLDivElement>("#modal-backdrop"))
          MovieModal.close();
      }
    );
    $<HTMLDivElement>(".modal-close").addEventListener("click", (event) => {
      event.stopPropagation();
      MovieModal.close();
    });
  },

  close: async () => {
    $<HTMLDivElement>("#modal-backdrop").remove();
  },
};

export default MovieModal;
