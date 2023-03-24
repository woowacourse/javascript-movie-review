import { Logo, Search } from "../../images";
import { $, dispatchCustomEvent } from "../utils/dom";

class MovieHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
    this.addEvent();
  }

  render() {
    this.innerHTML = /* html */ `
        <header>
          <a href="">
            <img src="${Logo}" alt="MovieList" />
          </a>
          <search-box class="search-box"></search-box>
          <button id="mobile-search-button">
            <img src="${Search}" alt="search" />
          </button>
        </header>
      `;
  }

  addEvent() {
    $("#mobile-search-button", this)?.addEventListener("click", () =>
      this.showMobileSearchInput()
    );
  }

  showMobileSearchInput() {
    const searchBox = this.querySelector<HTMLElement>("#search-input");

    $("#mobile-search-button", this)?.classList.add("hidden");
    $("search-box")?.classList.add("show");
    searchBox?.focus();
  }

  hideMobileSearchInput() {
    $("#mobile-search-button", this)?.classList.remove("hidden");
    $("search-box")?.classList.add("hidden");
  }
}
customElements.define("movie-header", MovieHeader);
