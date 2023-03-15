import CustomComponent from "../abstracts/CustomComponent";

export default class ListTitleComponent extends CustomComponent {
  setTitle(listTitle) {
    this.querySelector("#list-title").textContent = listTitle;
  }
  template() {
    return `
            <h2 id="list-title"></h2>
        `;
  }
}
customElements.define("list-title", ListTitleComponent);
