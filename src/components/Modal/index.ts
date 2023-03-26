import { MovieDetailResponse } from "../../types";
import { fetchMovieDetail } from "../../utils/api";
import { MovieDetail } from "../MovieDetail";

class Modal {
  #$target;
  constructor($target: Element) {
    this.#$target = $target;
    this.render();
  }

  render() {
    this.#$target.innerHTML = /*html*/ `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <button class="close-button">X</button>
    </div>`;
  }

  async renderMovieDetail(movieId: number) {
    this.#$target.classList.toggle("hidden");
    const movieDetail: MovieDetailResponse = await fetchMovieDetail(movieId);
    this.#$target.innerHTML = `${MovieDetail.render(movieDetail)}`;
  }

  closeModal() {}
}

export { Modal };
