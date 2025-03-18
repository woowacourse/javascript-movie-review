class SearchBar {
  static createSearchBar() {
    const searchBarContainer = document.createElement("div");
    searchBarContainer.classList.add("search-bar-container");

    const input = document.createElement("input");
    input.classList.add("search-bar-input");
    input.placeholder = "검색어를 입력하세요...";

    const searchButton = document.createElement("button");
    searchButton.classList.add("search-bar-button");

    const buttonImage = document.createElement("img");
    buttonImage.src = "/images/find.png";
    buttonImage.alt = "검색";
    buttonImage.classList.add("search-icon");

    searchButton.appendChild(buttonImage);

    searchBarContainer.appendChild(input);
    searchBarContainer.appendChild(searchButton);

    const searchHeader = document.querySelector(".search-header");
    console.log("searchHeader 확인:", searchHeader);

    searchHeader.appendChild(searchBarContainer);
  }
}

export default SearchBar;
