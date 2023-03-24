import CustomElement from "../basic/CustomElement";
import MovieBoss from "../../domain/MovieBoss";
import "./MovieDetail";
import { $ } from "../../util/dom";

class MovieModal extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieBoss.subscribeModal(this);
  }
  template() {
    return `
      <div class="modal modal-open">
        <div class="modal-backdrop"></div> 
        <div class="modal-container"></div>
      </div>
    `;
  }

  rerender(movie) {
    const src =
      movie.src === "null"
        ? "./image/noImg.jpeg"
        : `https://image.tmdb.org/t/p/w220_and_h330_face${movie.src}`;
    const temp = `
    <movie-detail id=${movie.id} title='${movie.title}' voteAverage=${movie.voteAverage} src=${src} detail='${movie.detail}' genres=${movie.genres}>
    </movie-detail>
    `;

    $(".modal-container").innerHTML = temp;
  }
}
customElements.define("movie-modal", MovieModal);

export default MovieModal;
