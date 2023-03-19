import CustomComponent from "../../abstracts/CustomComponent";

export default class MoreButtonComponent extends CustomComponent {
  static get observedAttributes() {
    return ["data-action"];
  }

  attributeChangedCallback() {
    const actionType = this.getAttribute("data-action");
    this.querySelector("button").setAttribute("data-action", actionType);
  }

  template() {
    return `
            <button class="btn primary full-width">더 보기</button>
        `;
  }
}

customElements.define("more-button", MoreButtonComponent);
