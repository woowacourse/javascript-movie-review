import "./index.css";

import { MovieDetail } from "../../types";
import { fetchMovieDetailById } from "../../utils/api";
import starImg from "../../../templates/star_filled.png";
import xButton from "../../../templates/xButton.png";
import { $ } from "../../utils/selector";

export class Modal {
  #$target;

  constructor($target: Element) {
    this.#$target = $target;

    ($(".x-button") as HTMLImageElement).src = xButton;

    this.bindEvent();
  }

  open(movieId: number) {
    const modalSection = $(".modal-section");

    fetchMovieDetailById(movieId).then((movieDetail) => {
      this.render(movieDetail);

      if (modalSection instanceof HTMLElement)
        modalSection.style.display = "block";
    });
  }

  close() {
    const modalSection = $(".modal-section");
    const modalHeader = $(".modal-header--text");

    if (modalSection instanceof HTMLElement)
      modalSection.style.display = "none";

    if (modalHeader instanceof HTMLElement) modalHeader.textContent = "";

    this.reset();
  }

  reset() {
    const modalImage = $(".modal-image");
    const modalDesc = $(".modal-movie-description");
    const topPosition = window.scrollY;

    if (modalImage instanceof HTMLImageElement) modalImage.src = "";

    if (modalDesc instanceof HTMLParagraphElement) modalDesc.innerHTML = "";

    window.location.hash = "";
    window.scrollTo(0, topPosition);
  }

  bindEvent() {
    $(".modal-backdrop").addEventListener("click", () => {
      this.close();
    });

    $(".x-button").addEventListener("click", () => {
      this.close();
    });

    window.addEventListener("keydown", (event: KeyboardEvent) => {
      if (event.key === "Escape") this.close();
    });
  }

  render(movie: MovieDetail) {
    const header = $(".modal-header--text");

    if (header instanceof HTMLElement) header.textContent = movie.title;

    this.#$target.innerHTML = this.getMovieDetailTemplate(movie);
  }

  getMovieDetailTemplate(movie: MovieDetail) {
    return /*html */ `
        <div class="modal-image-container">
            <img 
                class="modal-image skeleton" 
                src="https://image.tmdb.org/t/p/w220_and_h330_face/${
                  movie.poster_path
                }" 
                alt="${movie.title} 포스터" 
            />
        </div>
        <div class="modal-detail-container">
            <div class="modal-movie-detail">
                <p class="modal-movie-genre modal-detail--text">
                    ${movie.genre.join(" ")} 
                    <span>
                    <img src="${starImg}" alt="별점 ${movie.vote_average}" />
                    ${movie.vote_average.toFixed(1)}
                    </span>
                </p>
                <p class="modal-movie-description modal-detail--text">
                    ${movie.overview ? movie.overview : ""}
                </p>
                <div class="modal-star-rate modal-detail--text">내 별점 </div>
            </div>
        </div>
    `;
  }
}
