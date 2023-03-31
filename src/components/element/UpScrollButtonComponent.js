import CustomComponent from "../../abstracts/CustomComponent";

export default class UpScrollButtonComponent extends CustomComponent {
  template() {
    return `
            <button class="up-scroll-button" data-action="up-scroll">⬆</button>
        `;
  }
}

customElements.define("up-scroll-button", UpScrollButtonComponent);
