import { $ } from "../utils/Dom";

export default class SkeletonList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
        <ul class="item-list">
      </ul>
        `;
    this.mountSkeletonItem();
  }

  mountSkeletonItem() {
    const skeletonItem = /*html*/ `
        <li>
        <a href="#">
          <div class="item-card">
            <div class="item-thumbnail skeleton"></div>
            <div class="item-title skeleton"></div>
            <div class="item-score skeleton"></div>
          </div>
        </a>
      </li>
        `;

    const $itemList = $(".item-list");
    if ($itemList instanceof HTMLUListElement)
      $itemList.innerHTML = skeletonItem.repeat(20);
  }
}

customElements.define("skeleton-list", SkeletonList);
