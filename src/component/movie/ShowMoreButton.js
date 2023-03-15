import CustomElement from "../basic/CustomElement";

class ShowMoreButton extends CustomElement {
  template() {
    return `
    <button class="btn primary full-width">더 보기</button>
  `;
  }
}

customElements.define("show-more-button", ShowMoreButton);

export default ShowMoreButton;
