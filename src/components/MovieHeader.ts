import { Logo } from "../../images";
import { $ } from "../utils/dom";

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
    <h1><img src="${Logo}" alt="MovieList" /></h1>
    <search-box class="search-box"></search-box>
  </header>`;
  }

  addEvent() {
    $("h1", this)?.addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("movie-header", MovieHeader);
