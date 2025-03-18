import SearchBar from "./SearchBar";

const Header = () => {
  return /* html */ `
    <div class="header-container">
      <h1 class="logo">
        <img src="./images/logo.png" alt="MovieList" />
      </h1>
      ${SearchBar()}
      <div class="empty"></div>
    </div>
  `;
};

export default Header;
