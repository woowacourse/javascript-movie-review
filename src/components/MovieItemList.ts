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
    this.removeSkeleton();
  }

  removeSkeleton() {
    document.querySelectorAll(".skeleton").forEach((element) => {
      element.classList.remove("skeleton");
    });
  }

  render() {
    const container = document.createElement("section");
    container.classList.add("item-view");
    document.querySelector("main")?.appendChild(container);
    container.innerHTML = this.create();
  }

  renderNoData() {
    const itemList = document.querySelector(".item-list") as HTMLElement;
    itemList.innerHTML = `<div class="empty-data">검색 결과가 존재하지 않습니다.</div>`;
  }

  renderTitle(titleText: string) {
    const itemView = document.querySelector(".item-view") as HTMLElement;
    const titleSection = document.createElement("h2");
    titleSection.textContent = titleText;
    itemView.prepend(titleSection);
  }
}
