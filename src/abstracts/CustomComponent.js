export default class CustomComponent extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleEvent();
  }

  render() {
    this.innerHTML = this.template();
  }

  template() {}

  handleEvent() {}
}
