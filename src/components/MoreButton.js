export default class MoreButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ ` 
       <button id="more-button" class="btn primary full-width">
            더 보기
       </button>`;

    this.setEvent();
  }

  setEvent() {
    this.querySelector("#more-button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("click-more-button", { bubbles: true }) //detail :
      );
    });
  }
}

customElements.define("more-button", MoreButton);
