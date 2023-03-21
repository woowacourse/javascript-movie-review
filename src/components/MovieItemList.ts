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
}
