import { SKELETON } from "../constant/variables";

export default class SkeletonList extends HTMLElement {
  connectedCallback() {
    this.innerHTML =
      /*html*/
      `<ul class="item-list">
          ${SKELETON.ITEM.repeat(20)}
        </ul>
        `;
  }
}

customElements.define("skeleton-list", SkeletonList);
