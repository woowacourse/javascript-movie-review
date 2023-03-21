import { moreButton } from "./moreButton";

const MovieItemList = (totalPages: number, currentTab: string) => {
  const create = () => {
    return `<ul class="item-list"></ul>
    ${moreButton()}
    `;
  };

  const deleteAddButton = () => {
    const moreButton = document.querySelector(".primary");
    moreButton?.classList.add("hidden");
  };

  const addMovies = (movieInfos: string, currentPage: number) => {
    document
      .querySelector(".item-list")
      ?.insertAdjacentHTML("beforeend", movieInfos);

    totalPages < currentPage ? deleteAddButton() : null;
  };

  const render = () => {
    const container = document.createElement("section");
    container.classList.add("item-view");
    const currentTabElement = document.createElement("h2");

    container.innerHTML = create();
    container.insertAdjacentElement("afterbegin", currentTabElement);

    if (currentTab == "POPULAR") currentTabElement.innerHTML = "인기 있는 영화";
    if (currentTab == "SEARCH") currentTabElement.innerHTML = "검색 결과";
    document
      .querySelector("main")
      ?.insertAdjacentElement("afterbegin", container);
  };

  render();

  return {
    render,
    addMovies,
  };
};

export default MovieItemList;
