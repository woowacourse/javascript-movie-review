import { createElement } from "../../utils/createElement.ts";

const SearchBar = () => {
  const searchBar = createElement(/*html*/ `
    <div class="search-bar">
      <input placeholder="검색어를 입력하세요"/>
      <button>🔎</button>
    </div>
  `);

  return searchBar;
};

export default SearchBar;
