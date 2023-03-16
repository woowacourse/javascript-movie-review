import CustomComponent from "../../abstracts/CustomComponent";

export default class TitleComponent extends CustomComponent {
  setTitle(listTitle) {
    this.textContent = listTitle;
  }
}
customElements.define("movie-list-title", TitleComponent);
