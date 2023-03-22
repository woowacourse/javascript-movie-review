export default class CustomAsyncComponent extends HTMLElement {
  async connectedCallback() {
    await this.render();
    this.handleEvent();
  }

  async render() {
    this.innerHTML = await this.template();
  }

  async template() {}

  handleEvent() {}
}
