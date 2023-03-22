import MovieBoss from "../../domain/MovieBoss";
import CustomElement from "../basic/CustomElement";
import SearchInput from "../head/SearchInput";

class ShowMoreButton extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    MovieBoss.subscribe(this);
  }

  template() {
    return `
    <button class="show-more-button btn primary full-width">더 보기</button>
  `;
  }

  setEvent() {
    this.addEventListener("click", () => {
      MovieBoss.showMoreMovies();
    });
  }

  rerender() {
    const isLastPage = MovieBoss.isLastPage();
    this.hidden = isLastPage;
  }
}

customElements.define("show-more-button", ShowMoreButton);

export default ShowMoreButton;
