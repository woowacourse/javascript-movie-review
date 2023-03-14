import CustomComponent from "../abstracts/CustomComponent";

export default class MoreButtonComponent extends CustomComponent {
    template() {
        return `
            <button class="btn primary full-width">더 보기</button>
        `
    }
}
customElements.define("more-button", MoreButtonComponent);