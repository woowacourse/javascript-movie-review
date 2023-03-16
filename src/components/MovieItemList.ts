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
    // const listContainer = document.createDocumentFragment();
    // listContainer.classList.add("list-container");
    // listContainer.innerHTML = n;
    document.querySelector(".item-list")?.insertAdjacentHTML("beforeend", n);
  }

  render() {
    const container = document.createElement("section");
    container.classList.add("item-view");
    document.querySelector("main")?.appendChild(container);
    container.innerHTML = this.create();
    // console.log(container);
    // document.querySelector(".item-view")?.appendChild(container);
  }
}
