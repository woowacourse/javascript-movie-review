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
    <p class="title-logo"><img src="${Logo}" alt="MovieList" /></p>
    <search-box class="search-box"></search-box>
  </header>`;
  }

  addEvent() {
    $(".title-logo")?.addEventListener("click", () => {
      location.reload();
    });
  }
}

customElements.define("movie-header", MovieHeader);
