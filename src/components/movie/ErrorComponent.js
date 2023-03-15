import CustomComponent from "../../abstracts/CustomComponent";

export default class ErrorComponent extends CustomComponent {
  template() {
    return `
            <div>Oops! Something is Wrong!</div>
        `;
  }
}
customElements.define("error-page", ErrorComponent);
