import "./style.css";
import { IMovie } from "../../domain/Movie";

class Modal {
  $target: HTMLDivElement;

  constructor(target: HTMLDivElement) {
    this.$target = target;

    this.render();
    this.setEvent();
  }

  template() {
    return `
      <div class="modal modal-invisible">
        <div>
            <div class="modal-backdrop"></div>
        <div class="modal-container">
            <div class="modal-content">
            </div>
        </div>
        </div>
      </div>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML("beforeend", this.template());
  }

  updateContent(movie: IMovie) {
    const $modalContent = this.$target.querySelector(".modal-content");

    if ($modalContent instanceof HTMLDivElement) {
      $modalContent.innerHTML = `
        <h2>${movie.title}</h2>
        <p>voteAverage: ${movie.voteAverage}</p>
        <p>voteAverage: ${movie.voteAverage}</p>
        <p>Overview: ${movie.overview}</p>
      `;
    }
  }

  show() {
    const $modal = this.$target.querySelector(".modal");

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.remove("modal-invisible");
    }
  }

  hide() {
    const $modal = this.$target.querySelector(".modal");

    if ($modal instanceof HTMLDivElement) {
      $modal.classList.add("modal-invisible");
    }
  }

  setEvent() {
    const $modalBackdrop = this.$target.querySelector(".modal-backdrop");

    if ($modalBackdrop instanceof HTMLDivElement) {
      $modalBackdrop.addEventListener("click", () => {
        this.hide();
      });
    }
  }
}

export default Modal;
