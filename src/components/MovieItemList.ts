import { moreButton } from "./moreButton";
import { MovieItem } from "./MovieItem";

export default class MovieItemList {
  private _movieItems: any;
  currentTab: any;

  constructor() {
    //this._movieItems = movieInfo;
    this.render();
    // this.bindEvent();
  }

  // async bindEvent(callback: any) {
  //   document.querySelector(".primary")?.addEventListener("click", async () => {
  //     await callback();
  //   });
  // }

  create() {
    return `<ul class="item-list"></ul>
    ${moreButton()}
    `;
  }

  addMovies(n: any) {
    const listContainer = document.createElement("li");

    listContainer.innerHTML = n;
    console.log(n);
    document.querySelector(".item-list")?.appendChild(listContainer);
  }

  render() {
    const container = document.createElement("div");
    container.innerHTML = this.create();
    console.log(container);
    document
      .querySelector(".item-view")
      ?.insertAdjacentElement("afterend", container);
  }
}
