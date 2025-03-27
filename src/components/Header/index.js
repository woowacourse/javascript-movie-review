import { SearchBarRender, SearchBarMount } from "./SearchBar.js";

export function HeaderRender() {
  return /* html */ `
    <header id="header" class="header">
      <div class="header-container">
        <h1 class="logo">
          <a href="/javascript-movie-review">
            <img src="./images/logo.png" alt="MovieList" />
          </a>
        </h1>
        ${SearchBarRender()}
        <div class="empty"></div>
      </div>
    </header>
  `;
}

export function HeaderMount() {
  SearchBarMount();
}
