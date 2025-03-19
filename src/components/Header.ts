import { isHTMLElement } from "../utils/typeGuards";
import SearchBar from "./SearchBar";

interface Props {
  search: () => void;
}
class Header {
  #parentElement;
  #props;

  constructor(parentElement: HTMLElement, props: Props) {
    this.#parentElement = parentElement;
    this.#props = props;
    this.#render();
    this.#renderSearchBar();
  }

  #render() {
    this.#parentElement.innerHTML = /*html*/ `
        <h1 class="logo">
            <img src="./images/logo.png" alt="MovieList" />
        </h1>
        <div class="search-bar-container"></div>
    `;
  }

  #renderSearchBar() {
    const $searchBar = document.querySelector(".search-bar-container");
    if (isHTMLElement($searchBar))
      new SearchBar($searchBar, {
        search: () => this.#props.search(),
      });
  }
}

export default Header;
