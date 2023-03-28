import { CurrentTab } from "../@types/movieDataType";
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

  renderNoData(keyword: string) {
    const itemList = $(".item-list") as HTMLElement;
    const title = $("h2") as HTMLElement;
    title.remove();
    itemList.innerHTML = `<img class="empty-data-image" src="/bear.png"/><div class="empty-data"><strong class="keyword">${keyword}</strong>에 대한 검색 결과가 존재하지 않습니다.</div>`;
  }

  renderTitle(titleText: string) {
    const itemView = $(".item-view") as HTMLElement;
    const titleSection = document.createElement("h2");
    titleSection.textContent = titleText;
    itemView.prepend(titleSection);
  }

  getTitle(currentTab: CurrentTab) {
    return currentTab === CurrentTab.POPULAR
      ? "지금 인기있는 영화"
      : "의 검색결과";
  }
}
