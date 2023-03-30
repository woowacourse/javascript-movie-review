import { MovieItemListType } from "../@types/movieType";
import { MoreButton } from "./moreButton";

const MovieItemList = (currentTab: string, keyword = ''): MovieItemListType => {
  const create = () => {
    return `<ul class="item-list"></ul>
    ${MoreButton()}
    `;
  };

  const deleteAddButton = () => {
    const moreButton = document.querySelector(".primary");
    moreButton?.classList.add("hidden");
  };

  const addMovies = (
    movieInfos: string,
    totalPages: number,
    currentPage: number
  ) => {
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
    if (currentTab == "SEARCH") currentTabElement.innerHTML = `${keyword} 검색 결과`;
    document
      .querySelector("main")
      ?.insertAdjacentElement("afterbegin", container);
  };

  const bindEvent = () => {
    const ul = document.querySelector(".item-list");
    if (!ul) return;

    ul.addEventListener("click", (e: Event) => {
      const target = e.target;
      if (!(target instanceof HTMLElement)) return;

      const movieCard = target.closest("a");
      if (!movieCard) return;

      const eventId = movieCard.hash.substring(1);
      const event = new CustomEvent("movieItemClicked", { detail: { movieId: eventId } });
      document.dispatchEvent(event);
    });

  };

  render();
  bindEvent();

  return {
    render,
    addMovies,
  };
};

export default MovieItemList;
