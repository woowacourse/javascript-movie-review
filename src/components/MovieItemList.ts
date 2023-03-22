import { $, $$ } from "../utils/selector";

export default class MovieItemList {
  constructor() {
    this.render();
  }

  create() {
    return `<ul class="item-list"></ul>
    `;
  }

  removeSkeleton() {
    $$(".skeleton").forEach((element) => {
      element.classList.remove("skeleton");
    });
  }

  render() {
    const container = document.createElement("section");
    container.classList.add("item-view");
    $("main")?.appendChild(container);
    container.innerHTML = this.create();
  }

  renderNoData() {
    const itemList = $(".item-list") as HTMLElement;
    itemList.innerHTML = `<div class="empty-data">검색 결과가 존재하지 않습니다.</div>`;
  }

  renderTitle(titleText: string) {
    const itemView = $(".item-view") as HTMLElement;
    const titleSection = document.createElement("h2");
    titleSection.textContent = titleText;
    itemView.prepend(titleSection);
  }
}
