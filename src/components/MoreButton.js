class MoreButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = /*html*/ ` 
       <button id="more-button" class="btn primary full-width">
            더 보기
       </button>`;
  }
}

customElements.define("more-button", MoreButton);
