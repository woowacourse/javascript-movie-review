import { store } from "../../store/store.js";
import SearchHandler from "../handlers/SearchHandler.js";

class SearchBar {
  constructor(searchHandler) {
    this.searchHandler = searchHandler;
  }

  createSearchBar() {
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("search-bar-container");

    const input = document.createElement("input");
    input.classList.add("search-bar-input");
    input.placeholder = "검색어를 입력하세요...";

    input.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        await this.searchHandler.handleSearch(e.target.value);
        store.setMode('searchAdd');
      }
    });

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-bar-button");

    searchButton.addEventListener("click", async () => {
      await this.searchHandler.handleSearch(input.value);
      store.setMode('searchAdd');
    });

    const buttonImage = document.createElement("img");
    buttonImage.src = "images/find.png";
    buttonImage.alt = "검색";
    buttonImage.classList.add("search-icon");

    searchButton.appendChild(buttonImage);

    searchBarContainer.appendChild(input);
    searchBarContainer.appendChild(searchButton);

    const searchHeader = document.querySelector(".search-header");
    if (searchHeader) {
      searchHeader.appendChild(searchBarContainer);
    }
  }
}

export default SearchBar;
