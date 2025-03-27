// Header.ts
import SearchBar from "./SearchBar";
import Store from "../../store/store";

const Header = (store: Store): string => {
  setTimeout(attachHeaderStyle, 0);

  return /* html */ `
    <header id="header" class="header-container">
      <div class="header">
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

function attachHeaderStyle(): void {
  const $header = document.querySelector("#header") as HTMLElement | null;
  if ($header) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 0) {
        $header.classList.add("scrolled");
      } else {
        $header.classList.remove("scrolled");
      }
    });
  }
}

export default Header;
