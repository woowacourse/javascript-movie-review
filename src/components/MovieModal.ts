import { HTTPError } from "../api/HTTPError";
import { StarEmpty, StarFilled } from "../assets";
import { POSTER_BASE_URL, SCORE_COMMENT } from "../constants";
import MovieList from "../domain/MovieList";
import { MovieDetail } from "../types/movie";
import { $, $$ } from "../utils/domSelector";
import InvalidMessage from "./InvalidMessage";

const MovieModal = {
  loadMovieDetail: async () => {
    try {
      const movieDetail = await MovieList.getDetailedMovieData();
      const starCount = MovieList.getStars();
      console.log(starCount);
      MovieModal.render(movieDetail);
      MovieModal.renderStar(starCount);
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
                <img class="modal-icon" src="${StarFilled}" alt="별점"/>
                <p class="modal-text">${movie.vote_average}</p>
              </div>
              <p class="modal-text">${movie.overview}</p>
            </div>
            <div class="modal-score-box">
              <p class="bold">내 별점</p>
              <div id="star-count" class="star-count"></div>
            </div>
          </div>
        </div>
      </div>
    `;

    $<HTMLElement>(".item-view").insertAdjacentHTML("beforeend", template);
  },

  renderStar: (starCount: number) => {
    const score = starCount * 2;

    const template = `
    ${
      [...Array(starCount)]
        .map(
          (_, index) =>
            `<img id="${
              index + 1
            }" class="modal-score" src="${StarFilled}" alt="별점"/>`
        )
        .join("") +
      [...Array(5 - starCount)]
        .map(
          (_, index) =>
            `<img id="${
              starCount + index + 1
            }" class="modal-score" src="${StarEmpty}" alt="별점"/>`
        )
        .join("")
    }
    <p class="normal">${score}</p>
    <p class="normal">${SCORE_COMMENT[score]}</p>
    `;

    $<HTMLElement>("#star-count").replaceChildren();
    $<HTMLElement>("#star-count").insertAdjacentHTML("afterbegin", template);
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

    $$<HTMLImageElement>(".modal-score").forEach((star) => {
      star.addEventListener("click", () => {
        MovieModal.onClickStar(Number(star.id));
      });
    });
  },

  bindPressEvent: () => {
    window.addEventListener(
      "keyup",
      (event) => {
        if (event.code == "Backspace") {
          MovieModal.close();
        }
      },
      { once: true }
    );
  },

  bindGoBack: () => {
    history.pushState(null, location.href);
    window.onpopstate = function () {
      MovieModal.close();
    };
  },

  close: async () => {
    $<HTMLDivElement>("#modal-backdrop").remove();
  },

  onClickStar: async (starId: number) => {
    MovieModal.renderStar(starId);
    MovieModal.bindClickEvent();
  },
};

export default MovieModal;
