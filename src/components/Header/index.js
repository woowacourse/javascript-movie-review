import SearchBar, { attachSearchEvent } from "./SearchBar.js";

const Header = () => {
  return /* html */ `
    <header id="header" class="header">
      <div class="header-container">
        <h1 class="logo">
          <a href="/javascript-movie-review">
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
