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
      <img
        id="search"
        src="./images/search_button.png"
        alt="SearchButton"
      />
    `;

    searchContainerElement.insertAdjacentHTML("beforeend", content);

    return searchContainerElement;
  }
}

export default SearchBar;
