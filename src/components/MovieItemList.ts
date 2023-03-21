import { moreButton } from "./moreButton";

export default class MovieItemList {
  constructor() {
    this.render();
  }

  create() {
    return `<ul class="item-list"></ul>
    `;
  }

  addMovies(movieElementString: string) {
    document
      .querySelector(".item-list")
      ?.insertAdjacentHTML("beforeend", movieElementString);
  }

  render() {
    const container = document.createElement("section");
    container.classList.add("item-view");
    document.querySelector("main")?.appendChild(container);
    container.innerHTML = this.create();
  }

  renderNoData() {
    document.querySelector(
      ".item-list"
    )!.innerHTML = `<div class="empty-data">검색 결과가 존재하지 않습니다.</div>`;
  }
}
