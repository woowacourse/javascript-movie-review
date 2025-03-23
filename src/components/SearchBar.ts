import { IPage } from "../../types/domain";
import api from "../api/api";
import { selectElement, selectElementAll } from "../utils/dom.ts";
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
    const searchBar = selectElement<HTMLInputElement>(".search-bar");
    const thumbnailList = selectElement<HTMLUListElement>("ul.thumbnail-list");
    const query = searchBar.value;
    const seeMoreButton = selectElement<HTMLButtonElement>("#seeMore");

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

    const handleEnterKeyDown = (event: KeyboardEvent) => {
      if (event.isComposing) {
        return;
      }

      if (event.key === "Enter") {
        this.onSearchClick();
        searchInput.blur();
      }
    };

    searchInput.onfocus = () => {
      window.addEventListener("keydown", handleEnterKeyDown);
    };

    searchInput.onblur = () => {
      window.removeEventListener("keydown", handleEnterKeyDown);
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

  #changeTitleStyle(query: string) {
    const overlay = selectElement<HTMLDivElement>(".overlay");
    const topRatedContainer = selectElement<HTMLDivElement>(".top-rated-movie");
    const backgroundContainer = selectElement<HTMLDivElement>(
      ".background-container"
    );
    const subTitle = selectElement<HTMLHeadingElement>(".subTitle");

    subTitle.textContent = `"${query}" 검색 결과`;
    overlay.style.display = "none";
    topRatedContainer.style.display = "none";
    backgroundContainer.style.height = "auto";
  }

  async #renderSearchResult(query: string) {
    const thumbnailList = selectElement<HTMLUListElement>("ul.thumbnail-list");
    const itemCount = selectElementAll<HTMLLIElement>(
      "ul.thumbnail-list li"
    ).length;
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
