export default class MoreButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ ` 
       <button id="more-button" class="btn primary full-width">
            더 보기
       </button>`;

    this.initEventHandler();
  }

  initEventHandler() {
    this.querySelector("#more-button").addEventListener("click", () => {
      this.dispatchEvent(
        new CustomEvent("more-button-clicked", { bubbles: true }) //detail :
      );
      2;
    });
  }
}

customElements.define("more-button", MoreButton);
