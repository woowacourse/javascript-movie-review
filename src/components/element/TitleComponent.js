import CustomComponent from "../../abstracts/CustomComponent";

export default class TitleComponent extends CustomComponent {
  setTitle(movieListTitle) {
    this.textContent = movieListTitle;
  }
}

customElements.define("movie-list-title", TitleComponent);
