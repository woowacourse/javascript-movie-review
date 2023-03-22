import { StarFilled, StartEmpty } from "../../images";
import type { Genre, Movie } from "../types/type";
import { $ } from "../utils/dom";

class MovieDetailModal extends HTMLElement {
  constructor() {
    super();
  }

  render(movie: Movie, genres: any) {
    console.log(movie);

    const { title, poster_path, genre_ids, vote_average, overview } = movie;

    const selectedGenres = genres["genres"]
      .filter((genre: Genre) => genre_ids?.includes(genre.id))
      .map((genre: Genre) => genre.name);

    const movieOverView = overview
      ? overview
      : "영화 내용이 등록되지 않았습니다";

    this.innerHTML = /* html */ `
      <dialog class="modal">
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
          <div>
            <div>
              <span>${selectedGenres}</span>
              <span>
                <img src="${StarFilled}" class="star" alt="별점" />
                ${vote_average}
              </span>
            </div>
            <p>${movieOverView}</p>
            <div class="user-vote">
              <span>내 별점</span>
              <span class="item-score">
                <img src="${StartEmpty}" class="star" alt="별점" />
                <img src="${StartEmpty}" class="star" alt="별점" />
                <img src="${StartEmpty}" class="star" alt="별점" />
                <img src="${StartEmpty}" class="star" alt="별점" />
                <img src="${StartEmpty}" class="star" alt="별점" />
              </span>
              <span>6</span>
              <span>보통이에요</span>
            </div>
          </div>
        </div>
      </dialog>
    `;
    this.addEvent();
  }

  addEvent() {
    $(".modal-close-button")?.addEventListener("click", () => {
      const dialog = <HTMLDialogElement>$(".modal");

      dialog.close();
    });
  }

  openModal() {
    const dialog = <HTMLDialogElement>$(".modal");
    dialog.showModal();
  }
}

interface MovieDetailModal {
  "movie-detail-modal": typeof MovieDetailModal;
}

customElements.define("movie-detail-modal", MovieDetailModal);

export default MovieDetailModal;
