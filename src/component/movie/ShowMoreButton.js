import MovieManager from "../../domain/MovieManager";
import CustomElement from "../basic/CustomElement";

class ShowMoreButton extends CustomElement {
  template() {
    return `
    <button class="show-more-button btn primary full-width">더 보기</button>
  `;
  }

  setEvent() {
    this.addEventListener("click", () => {
      MovieManager.showSkeleton();
      MovieManager.showMoreMovies();

      const isLastPage = MovieManager.toggleButton();
      this.hidden = isLastPage;
    });
  }
}

customElements.define("show-more-button", ShowMoreButton);

export default ShowMoreButton;
