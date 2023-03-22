import { StarFilled, StartEmpty } from "../../images";
import type { Genre, Movie } from "../types/type";
import { $ } from "../utils/dom";

class MovieDetailModal extends HTMLElement {
  constructor() {
    super();
  }

  render(movie: Movie, genres: any) {
    const { title, poster_path, genre_ids, vote_average, overview } = movie;

    const selectedGenres = genres["genres"]
      .filter((genre: Genre) => genre_ids?.includes(genre.id))
      .map((genre: Genre) => genre.name);

    const movieOverView = overview
      ? overview
      : "영화 내용이 등록되지 않았습니다";

    this.innerHTML = /* html */ `
      <dialog>
      <div class="modal-backdrop"></div>
      <div class="modal">
        <div class="modal-header">
          <span class="modal-title">${title}</span>
          <button class="modal-close-button">
            <span class="close">X</span>
          </button>
        </div>
        <div class="modal-content">
          <div>
            <img class="modal-image" src="https://image.tmdb.org/t/p/original/${poster_path}" alt="${title}">
          </div>
          <div class="modal-detail-content">
            <div class="modal-content-header">
              <span class="modal-genre">${selectedGenres}</span>
              <span>
                <img src="${StarFilled}" class="vote-star" alt="별점" />
                ${vote_average}
              </span>
            </div>
            <p class="modal-overview">${movieOverView}</p>
            <div class="vote-container">
              <div class="user-vote">
                <span class="vote-title">내 별점</span>
                <span class="vote-score">
                  <img src="${StartEmpty}" class="user-vote-star" alt="별점" />
                  <img src="${StartEmpty}" class="user-vote-star" alt="별점" />
                  <img src="${StartEmpty}" class="user-vote-star" alt="별점" />
                  <img src="${StartEmpty}" class="user-vote-star" alt="별점" />
                  <img src="${StartEmpty}" class="user-vote-star" alt="별점" />
                </span>
                <span>6</span>
                <span class="vote-review">보통이에요</span>
              </div>
            </div>
          </div>
        </div>
        </div>
      </dialog>
    `;
    this.addEvent();
  }

  addEvent() {
    const dialog = <HTMLDialogElement>$("dialog");
    const $elements = [$(".modal-backdrop"), $(".modal-close-button")];

    $elements.forEach((element) => {
      element?.addEventListener("click", () => {
        dialog.close();
      });
    });

    window.addEventListener("popstate", () => {
      dialog.close();
    });
  }

  openModal() {
    const dialog = <HTMLDialogElement>$("dialog");
    dialog.showModal();
  }
}

interface MovieDetailModal {
  "movie-detail-modal": typeof MovieDetailModal;
}

customElements.define("movie-detail-modal", MovieDetailModal);

export default MovieDetailModal;
