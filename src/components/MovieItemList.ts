import { moreButton } from "./moreButton";

const MovieItemList = () => {
  const create = () => `<ul class="item-list"></ul>
  ${moreButton()}
  `;

  const addMovies = (movieInfos: string) => {
    document
      .querySelector(".item-list")
      ?.insertAdjacentHTML("beforeend", movieInfos);
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
