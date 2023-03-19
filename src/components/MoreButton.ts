import { $ } from "../utils/Dom";

export default class MoreButton extends HTMLElement {
  get movieListLength(): number {
    return Number(this.getAttribute("movieListLength"));
  }

  connectedCallback() {
    this.innerHTML = /*html*/ ` 
       <button id="more-button" class="btn primary full-width">
            더 보기
       </button>`;

    this.setEvent();
  }

  setEvent() {
    const $moreButton = $("more-button");
    if ($moreButton instanceof MoreButton)
      $moreButton.addEventListener("click", () => {
        this.toggleMoreButton($moreButton);
        this.dispatchEvent(
          new CustomEvent("click-more-button", { bubbles: true })
        );
      });
  }

  toggleMoreButton($moreButton: MoreButton) {
    this.movieListLength < 20
      ? $moreButton.classList.add("hidden")
      : $moreButton.classList.remove("hidden");
  }
}

customElements.define("more-button", MoreButton);
