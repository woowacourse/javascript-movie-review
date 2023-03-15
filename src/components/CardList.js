export default class CardList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <h2>지금 인기 있는 영화</h2>
        <ul class="item-list">
        </ul>
        `;
  }
}

customElements.define("card-list", CardList);
