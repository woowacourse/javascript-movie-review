import { SKELETON_REPEAT_TIME } from "../constant/setting";
import { $ } from "../utils/Dom";

export default class SkeletonList extends HTMLElement {
  connectedCallback() {
    this.render();
    this.mountSkeletonItem();
  }

  render() {
    this.innerHTML = `
        <ul class="item-list">
      </ul>
        `;
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

    const $itemList = this.querySelector(".item-list");
    if ($itemList instanceof HTMLUListElement)
      $itemList.innerHTML = skeletonItem.repeat(SKELETON_REPEAT_TIME);
  }
}

customElements.define("skeleton-list", SkeletonList);
