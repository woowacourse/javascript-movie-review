import { IPage } from "../../types/domain";
import movieApi from "../api/movieApi.ts";
import calculatePageNumber from "../domain/calculatePageNumber.ts";
import { selectElement } from "../utils/dom.ts";
import {
  toggleNoThumbnail,
  toggleSeeMoreButton,
  toggleSkeletonList,
} from "../utils/Render";
import MovieItem from "./MovieItem";
import MovieList from "./MovieList.ts";

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
    const query = searchBar.value;
    const seeMoreButton = selectElement<HTMLButtonElement>("#seeMore");

    this.#changeTitleStyle(query);
    toggleNoThumbnail("hidden");
    toggleSkeletonList("show");

    const movieList = new MovieList([]);
    movieList.clearList();

    await this.#renderSearchResult(movieList, query);

    seeMoreButton.onclick = async () => {
      await this.#renderSearchResult(movieList, query);
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
    imgButton.onclick = () => {
      this.onSearchClick();
    };

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

  async #renderSearchResult(movieListInstance: MovieList, query: string) {
    const currentItemCount = movieListInstance.getTotalItems();
    const pageNumber = calculatePageNumber(currentItemCount);

    toggleSkeletonList("show");
    toggleSeeMoreButton("hidden");

    const searchResult = await this.#getSearchResult(pageNumber, query);
    if (pageNumber < searchResult.total_pages) toggleSeeMoreButton("show");
    if (searchResult.total_results === 0) toggleNoThumbnail("show");
    toggleSkeletonList("hidden");

    const movieItems = searchResult.results.map(
      ({ title, poster_path, vote_average }) => {
        const movieItem = new MovieItem({ title, vote_average, poster_path });
        return movieItem.create();
      }
    );

    movieListInstance.updateList(movieItems);
  }

  async #getSearchResult(pageNumber: number, query: string) {
    return (await movieApi.getSearchData(pageNumber, query)) as IPage;
  }
}

export default SearchBar;
