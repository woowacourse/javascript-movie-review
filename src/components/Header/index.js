import SearchBar from "./SearchBar";

const Header = () => {
  return /* html */ `
    <header class="header">
      <div class="header-container">
        <h1 class="logo">
          <img src="./images/logo.png" alt="MovieList" />
        </h1>
        ${SearchBar()}
        <div class="empty"></div>
      </div>
    </header>
  `;
};

export default Header;
