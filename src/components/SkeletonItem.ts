export default class SkeletonItem extends HTMLElement {
  constructor() {
    super();

    this.render();
  }

  render() {
    this.innerHTML = `
    <li>
      <div class="item-card">
        <div class="item-thumbnail skeleton"></div>
        <div class="item-title skeleton"></div>
        <div class="item-score skeleton"></div>
      </div>
    </li>
    `;
  }
}
