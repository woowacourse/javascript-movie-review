import "./index.css";
import MovieDetailModal from "./MovieDetail";

const Modal = {
  openMovieDetail(movieId) {
    this.open();

    MovieDetailModal.init(movieId);
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
    document.body.style.overflow = "hidden";
  },

  close() {
    const $modal = document.querySelector(".modal");

    $modal.classList.remove("modal-open");
    document.body.style.removeProperty("overflow");
  },

  setEvent() {
    const $modalBackground = document.querySelector(".modal-background");

    $modalBackground.addEventListener("click", this.close);
    document.addEventListener("keydown", (e) => {
      if (e.key !== "Escape") return;
      this.close();
    });
  },
};

export default Modal;
