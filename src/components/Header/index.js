// components/Header/index.js
import SearchBar, { attachSearchEvent } from "./SearchBar.js";

const Header = () => {
  // DOM에 삽입 후 SearchBar 이벤트 핸들러 등록
  setTimeout(() => attachSearchEvent(), 0);
  return /* html */ `
    <header id="header" class="header">
      <div class="header-container">
        <h1 class="logo">
          <a href="/">
            <img src="./images/logo.png" alt="MovieList" />
          </a>
        </h1>
        ${SearchBar()}
        <div class="empty"></div>
      </div>
    </header>
  `;
};

export default Header;
