import { IPage } from "../../types/domain";
import api from "../api/api";
import {
  toggleNoThumbnail,
  toggleSeeMoreButton,
  toggleSkeletonList,
} from "../utils/Render";
import MovieItem from "./MovieItem";

class SearchBar {
  constructor() {}

  create() {
    const searchContainerElement = document.createElement("div");
    searchContainerElement.classList.add("search-container");

    const content = /*html*/ `
      <input
        type="text"
        class="search-bar"
        placeholder="검색어를 입력하세요"
      />
    `;

    searchContainerElement.insertAdjacentHTML("beforeend", content);
    const imgButton = document.createElement("img");
    imgButton.id = "search";
    imgButton.src = "./images/search_button.png";
    imgButton.alt = "SearchButton";
    imgButton.onclick = () => this.onSearchClick();
    searchContainerElement.appendChild(imgButton);

    return searchContainerElement;
  }

  async onSearchClick() {
    const searchBar = document.querySelector(".search-bar") as HTMLInputElement;
    const thumbnailList = document.querySelector("ul.thumbnail-list");
    const query = searchBar.value;

    this.#changeTitleStyle(query);
    toggleNoThumbnail("hidden");
    toggleSkeletonList("show");

    thumbnailList?.replaceChildren();

    await this.#renderSearchResult(query);

    const seeMoreButton = document.querySelector(
      "#seeMore"
    ) as HTMLButtonElement;

    seeMoreButton.onclick = async () => {
      await this.#renderSearchResult(query);
    };
  }

  #changeTitleStyle(query: string) {
    const overlay = document.querySelector(".overlay") as HTMLDivElement;
    const topRatedContainer = document.querySelector(
      ".top-rated-movie"
    ) as HTMLDivElement;
    const backgroundContainer = document.querySelector(
      ".background-container"
    ) as HTMLDivElement;
    const subTitle = document.querySelector(".subTitle") as HTMLHeadingElement;

    subTitle.textContent = `"${query}" 검색 결과`;
    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }

  async #renderSearchResult(query: string) {
    const thumbnailList = document.querySelector("ul.thumbnail-list");
    const itemCount = document.querySelectorAll("ul.thumbnail-list li").length;
    const pageNumber = itemCount / 20 + 1;

    toggleSkeletonList("show");
    toggleSeeMoreButton("hidden");

    const searchResult = await this.#getSearchResult(pageNumber, query);
    if (pageNumber < searchResult.total_pages) toggleSeeMoreButton("show");
    if (searchResult.total_results === 0) toggleNoThumbnail("show");
    toggleSkeletonList("hidden");

    searchResult.results.forEach(({ title, poster_path, vote_average }) => {
      const movieItem = new MovieItem({
        title,
        vote_average,
        poster_path,
      });
      const movieItemElement = movieItem.create();
      thumbnailList?.appendChild(movieItemElement);
    });
  }

  async #getSearchResult(pageNumber: number, query: string) {
    return (await api.getSearchData(pageNumber, query)) as IPage;
  }
}

export default SearchBar;
