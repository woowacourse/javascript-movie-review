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
    document
      .querySelector(".item-list")
      ?.insertAdjacentHTML("afterend", this.create());
  }

  hadleEvent() {
    const moreButton = document.querySelector(".primary");
    moreButton?.addEventListener("click", this.onClick);
  }

  onClick() {
    const event = new CustomEvent("clickMoreButton");
    document.querySelector(".primary")?.dispatchEvent(event);
  }

  hide() {
    document.querySelector(".primary")?.classList.add("hidden");
  }

  show() {
    document.querySelector(".primary")?.classList.remove("hidden");
  }
}
