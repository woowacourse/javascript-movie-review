import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class MovieError extends CustomElement {
  connectedCallback() {
    MovieManager.subscribeError(this);
  }

  template() {
    return `
      <div class='error'>
        <h1 class='error-message'></h1>
        <p>불편을 드려 죄송합니다.</p>
      </div>  
    `;
  }

  rerender(errorMessage) {
    $("movie-container").remove();
    super.render();
    $(".error-message").innerText = errorMessage;
  }
}

customElements.define("movie-error", MovieError);

export default MovieError;
