import CustomComponent from "../abstracts/CustomComponent";

export default class ListTitleComponent extends CustomComponent {
    template() {
        return `
            <h2>지금 인기 있는 영화</h2>
        `
    }
}
customElements.define("list-title", ListTitleComponent);
