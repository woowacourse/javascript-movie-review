const SearchBar = () => {
  return /* html */ `
    <div class="search-bar-container">
      <input type="text" class="search-bar" placeholder="검색어를 입력하세요" />
      <button class="search-button">
        <img src="./images/search.png" alt="search" width="16" height="16" />
      </button>
    </div>
  `;
};

export default SearchBar;
