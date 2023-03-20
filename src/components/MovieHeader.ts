import { Logo } from "../../images";
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
          <button id="logo-button" type="button">
            <img src="${Logo}" alt="MovieList" />
          </button>
          <search-box class="search-box" />
        </header>
      `;
  }

  addEvent() {
    $("#logo-button", this)?.addEventListener("click", () => {
      dispatchCustomEvent(this, {
        eventType: "clickLogo",
      });
    });
  }
}
customElements.define("movie-header", MovieHeader);
