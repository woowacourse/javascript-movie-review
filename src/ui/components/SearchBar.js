import { store } from "../../store/store.js";
import SearchHandler from "../handlers/SearchHandler.js";

class SearchBar {
  constructor(searchHandler) {
    this.searchHandler = searchHandler;
  }

  createSearchBar() {
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("search-bar-container");

    const form = document.createElement("form");
    form.classList.add("search-form");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const input = form.querySelector(".search-bar-input");
      await this.searchHandler.handleSearch(input.value);
      store.setMode("searchAdd");
    });

    const input = document.createElement("input");
    input.classList.add("search-bar-input");
    input.placeholder = "검색어를 입력하세요...";
    input.name = "query";

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-bar-button");
    searchButton.type = "submit";

    const buttonImage = document.createElement("img");
    buttonImage.src = "images/find.png";
    buttonImage.alt = "검색";
    buttonImage.classList.add("search-icon");

    searchButton.appendChild(buttonImage);

    form.appendChild(input);
    form.appendChild(searchButton);

    searchBarContainer.appendChild(form);

    const searchHeader = document.querySelector(".search-header");
    if (searchHeader) {
      searchHeader.appendChild(searchBarContainer);
    }
  }
}

export default SearchBar;
