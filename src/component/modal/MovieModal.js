import CustomElement from "../basic/CustomElement";
import "./MovieDetail";

class MovieModal extends CustomElement {
  template() {
    return `
      <div class="modal">
        <div class="modal-backdrop"></div> 
        <div class="modal-container">
          <movie-detail></movie-detail>
        </div>
      </div>
    `;
  }
}
customElements.define("movie-modal", MovieModal);

export default MovieModal;
