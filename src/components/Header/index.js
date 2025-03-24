import SearchBar from "./SearchBar.js";

const Header = (store) => {
  setTimeout(() => attachHeaderStyle(), 0);

  return /* html */ `
    <header id="header" class="header">
      <div class="header-container">
        <h1 class="logo">
          <a href="/javascript-movie-review">
            <img src="./images/logo.png" alt="MovieList" />
          </a>
        </h1>
        ${SearchBar(store)}
        <div class="empty"></div>
      </div>
    </header>
  `;
};

function attachHeaderStyle() {
  const $header = document.querySelector("#header");

  if ($header) {
    window.addEventListener("scroll", async (event) => {
      if (window.scrollY > 0) {
        $header.classList.add("scrolled");
        return;
      }
      $header.classList.remove("scrolled");
    });
  }
}

export default Header;
