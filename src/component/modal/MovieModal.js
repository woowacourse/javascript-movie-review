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
        <div class="modal-container">
        </div>
      </div>
    `;
  }

  rerender(movie) {
    const temp = `
    <movie-detail id=${movie.id} title='${movie.title}' voteAverage=${movie.voteAverage} src=${movie.src} detail='${movie.detail}' genre_ids=${movie.genre_ids}>
    </movie-detail>
    `;

    $(".modal-container").innerHTML = temp;
  }
}
customElements.define("movie-modal", MovieModal);

export default MovieModal;
