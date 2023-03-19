import { moreButton } from "./moreButton";

const MovieItemList = (totalPages: number) => {
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
    document.querySelector("main")?.appendChild(container);
    container.innerHTML = create();
  };

  render();

  return {
    render,
    addMovies,
  };
};

export default MovieItemList;
