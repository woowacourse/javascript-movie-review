export default class CustomComponent extends HTMLElement {
    connectedCallback() {
        this.render();
    }

    render() {
        this.innerHTML = this.template();
    }

    template() {}
}