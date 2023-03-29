import CustomElement from "../basic/CustomElement";
import MovieBoss from "../../domain/MovieBoss";
import { $ } from "../../util/dom";
import { IMG } from "../../abstract/constants";
import "./MovieDetail";

class MovieModal extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieBoss.subscribeModal(this);
  }
  template() {
    return `
      <div class="modal">
        <div class="modal-backdrop"></div> 
        <div class="modal-container"></div>
      </div>
    `;
  }

  rerender(movie) {
    this.showModal();
    const src = movie.src === "null" ? IMG.NO_IMG : IMG.FRAME + movie.src;

    const temp = `
    <movie-detail id=${movie.id} title='${movie.title}' voteAverage=${movie.voteAverage} src=${src} detail='${movie.detail}' genres=${movie.genres}>
    </movie-detail>
    `;

    $(".modal-container").innerHTML = temp;
  }

  setEvent() {
    $(".modal-container").addEventListener("click", (e) => {
      const target = e.target;
      if (target.id === "close-btn") this.hideModal();
    });

    window.addEventListener("keyup", (e) => {
      if (!$(".modal").classList.contains("modal-open")) return;
      if (e.key === "Escape") {
        this.hideModal();
      }
    });
  }

  hideModal() {
    $(".modal").classList.remove("modal-open");
    $(".modal").closest("body").classList.remove("scroll");
  }

  showModal() {
    $(".modal").classList.add("modal-open");
    this.closest("body").classList.add("scroll");
  }
}
customElements.define("movie-modal", MovieModal);

export default MovieModal;
