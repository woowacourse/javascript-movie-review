import MovieManager from "../../domain/MovieManager";
import { $ } from "../../util/dom";
import CustomElement from "../basic/CustomElement";

class ShowMoreButton extends CustomElement {
  template() {
    return `
    <button class="show-more-button btn primary full-width">더 보기</button>
  `;
  }

  setEvent() {
    $(".show-more-button").addEventListener("click", () => {
      MovieManager.showMoreMovies();
    });
  }
}

customElements.define("show-more-button", ShowMoreButton);

export default ShowMoreButton;
