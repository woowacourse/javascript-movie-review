import "./index.css";
import MovieDetailModal from "./MovieDetail";

const Modal = {
  openMovieDetail(movie) {
    this.open();

    MovieDetailModal.render(movie);
  },

  template() {
    return `
      <div class="modal-background"></div>
      <section class="modal-container"></section>
    `;
  },

  open() {
    const $modal = document.querySelector(".modal");

    if (!$modal.hasChildNodes()) {
      $modal.innerHTML = this.template();
      this.setEvent();
    }

    $modal.classList.add("modal-open");
  },

  close() {
    const $modal = document.querySelector(".modal");

    $modal.classList.remove("modal-open");
  },

  setEvent() {
    const $modalBackground = document.querySelector(".modal-background");

    $modalBackground.addEventListener("click", this.close);
  },
};

export default Modal;
