import { PaginatedMovies } from "../../types/domain";
import api from "../api/api";
import {
  toggleNoThumbnail,
  toggleSeeMoreButton,
  toggleSkeletonList,
} from "../utils/Render";
import MovieItem from "./MovieItem";

class SearchBar {
  #element;

  constructor() {
    this.#element = document.createElement("div");
  }

  create() {
    this.#element.classList.add("search-container");
    this.#element.appendChild(this.#getInputElement());
    this.#element.appendChild(this.#getImageButton());

    return this.#element;
  }

  async onSearchClick() {
    const searchBar = document.querySelector(".search-bar") as HTMLInputElement;
    const thumbnailList = document.querySelector("ul.thumbnail-list");
    const query = searchBar.value;
    const seeMoreButton = document.querySelector(
      "#seeMore"
    ) as HTMLButtonElement;

    this.#changeTitleStyle(query);
    toggleNoThumbnail("hidden");
    toggleSkeletonList("show");

    thumbnailList?.replaceChildren();

    await this.#renderSearchResult(query);

    seeMoreButton.onclick = async () => {
      await this.#renderSearchResult(query);
    };
  }

  #getInputElement() {
    const searchInput = document.createElement("input");
    searchInput.type = "text";
    searchInput.classList.add("search-bar");
    searchInput.placeholder = "검색어를 입력하세요";
    searchInput.onfocus = () => {
      window.addEventListener("keydown", (e) => this.#handleEnterKeyDown(e));
    };
    searchInput.onblur = () => {
      window.removeEventListener("keydown", (e) => this.#handleEnterKeyDown(e));
    };

    return searchInput;
  }

  #getImageButton() {
    const imgButton = document.createElement("img");
    imgButton.id = "search";
    imgButton.src = "./images/search_button.png";
    imgButton.alt = "SearchButton";
    imgButton.onclick = () => this.onSearchClick();

    return imgButton;
  }

  #handleEnterKeyDown(event: KeyboardEvent) {
    if (event.key === "Enter") {
      this.onSearchClick();
    }
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
    return (await api.getSearchData(pageNumber, query)) as PaginatedMovies;
  }
}

export default SearchBar;
