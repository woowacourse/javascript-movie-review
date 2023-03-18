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
        <h1>예상치 못한 오류가 발생했습니다.</h1>
        <p>불편을 드려 죄송합니다.</p>
      </div>  
    `;
  }

  render() {
    $("movie-container").remove();
    super.render();
  }
}

customElements.define("movie-error", MovieError);

export default MovieError;
