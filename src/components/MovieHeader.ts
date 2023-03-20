import { Logo } from "../../images";
import { $, dispatchCustomEvent } from "../utils/dom";

class MovieHeader extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = /* html */ `
        <header>
          <a href="">
            <img src="${Logo}" alt="MovieList" />
          </a>
          <search-box class="search-box" />
        </header>
      `;
  }
}
customElements.define("movie-header", MovieHeader);
