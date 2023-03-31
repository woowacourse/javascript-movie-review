export default class MoreButton extends HTMLElement {
  get length(): number {
    return Number(this.getAttribute('length'));
  }

  connectedCallback() {
    this.render();
    this.setEvent();
  }

  static get observedAttributes() {
    return ['length'];
  }

  attributeChangedCallback() {
    this.toggleMoreButton();
  }

  render() {
    this.innerHTML = /*html*/ ` 
       <button id="more-button" class="btn primary full-width">
            더 보기
       </button>`;
  }

  setEvent() {
    this.addEventListener('click', () => {
      this.dispatchEvent(
        new CustomEvent('click-more-button', { bubbles: true }),
      );
    });
  }

  toggleMoreButton() {
    this.length < 20
      ? this.classList.add('hidden')
      : this.classList.remove('hidden');
  }
}

customElements.define('more-button', MoreButton);
