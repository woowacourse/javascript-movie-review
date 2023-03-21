import { $ } from "../utils/selector";

export default class MoreButton {
  constructor() {
    this.render();
    this.hadleEvent();
  }

  create() {
    return `
    <button class="btn primary full-width hidden">더 보기</button>
    `;
  }

  render() {
    $(".item-list")?.insertAdjacentHTML("afterend", this.create());
  }

  hadleEvent() {
    const moreButton = document.querySelector(".primary");
    moreButton?.addEventListener("click", this.onClick);
  }

  onClick() {
    const event = new CustomEvent("clickMoreButton");
    $(".primary")?.dispatchEvent(event);
  }

  hide() {
    $(".primary")?.classList.add("hidden");
  }

  show() {
    $(".primary")?.classList.remove("hidden");
  }
}
