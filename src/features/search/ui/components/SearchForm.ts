const SearchForm = () => {
  const searchForm = document.createElement("form");
  searchForm.classList.add("search-form");

  searchForm.innerHTML = /*html*/ `
    <input
      id="search-input"
      name="search-input"
      type="text"
      placeholder="검색어를 입력하세요"
    />
    <button type="submit" class="search-button">
      <img src="images/search.png" alt="Search" />
    </button>
`;

  return searchForm;
};

export default SearchForm;
