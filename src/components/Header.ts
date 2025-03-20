import { isHTMLElement } from "../utils/typeGuards";
import SearchBar from "./SearchBar";

interface Props {
  onSearchSubmitted: (params: string) => void;
  onLogoClicked: () => void;
}
class Header {
  #parentElement;
  #props;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#render();
    this.#renderSearchBar();
    this.#addEventListeners();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
        <button class="logo">
          <h1>
              <img src="./images/logo.png" alt="MovieList" />
          </h1>
        </button>
        <div class="search-bar-container"></div>
    `;
  }

  #renderSearchBar() {
    const $searchBar = document.querySelector(".search-bar-container");
    if (isHTMLElement($searchBar))
      new SearchBar($searchBar, {
        onSearchSubmitted: (params) => this.#props.onSearchSubmitted(params),
      });
  }

  #addEventListeners() {
    const $logo = document.querySelector(".logo");
    if (isHTMLElement($logo)) {
      $logo.addEventListener("click", () => this.#props.onLogoClicked());
    }
  }
}

export default Header;
