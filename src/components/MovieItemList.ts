import { moreButton } from "./moreButton";

export default class MovieItemList {
  constructor() {
    this.render();
  }

  create() {
    return `<ul class="item-list"></ul>
    ${moreButton()}
    `;
  }

  addMovies(movieInfos: string) {
    document
      .querySelector(".item-list")
      ?.insertAdjacentHTML("beforeend", movieInfos);
  }

  render() {
    const container = document.createElement("section");
    container.classList.add("item-view");
    document.querySelector("main")?.appendChild(container);
    container.innerHTML = this.create();
  }
}
