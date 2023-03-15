import CustomComponent from "../../abstracts/CustomComponent";

export default class MoreButtonComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-action"];
  }

  attributeChangedCallback() {
    console.log(this.querySelector("button"));
    this.querySelector("button").setAttribute(
      "data-action",
      this.getAttribute("data-action")
    );
  }

  template() {
    return `
            <button class="btn primary full-width" data-action="">더 보기</button>
        `;
  }
}
customElements.define("more-button", MoreButtonComponent);
