import MovieManager from "../../domain/MovieManager";
import CustomElement from "../basic/CustomElement";

class ShowMoreButton extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieManager.subscribe(this);
  }

  template() {
    return `
    <button class="show-more-button btn primary full-width">더 보기</button>
  `;
  }

  setEvent() {
    this.addEventListener("click", () => {
      MovieManager.showSkeleton();
      MovieManager.showMoreMovies();
    });
  }

  rerender({ page, totalPages }) {
    const isLastPage = page === totalPages;
    this.hidden = isLastPage;
  }
}

customElements.define("show-more-button", ShowMoreButton);

export default ShowMoreButton;
