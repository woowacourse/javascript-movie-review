import { apiStatus } from "../../constant/movieConstants";
import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieError extends CustomElement {
  connectedCallback() {
    MovieManager.subscribe(this.rerender.bind(this));
  }

  template() {
    return `
      <div class='error'>
        <h1 class='error-message'></h1>
        <p>불편을 드려 죄송합니다.</p>
      </div>  
    `;
  }

  rerender(state) {
    if (state.status === apiStatus.FAILURE) {
      super.render();
      $(".error-message").innerText = state.data.errorMessage;
    }
  }
}

customElements.define("movie-error", MovieError);

export default MovieError;
