export default class MovieHeader extends HTMLElement {
  connectedCallback() {
    this.render();
    this.setEvent();
  }

  render() {
    this.innerHTML = /*html*/ `
  <header class="flex justify-between">
    <img class='home-button'/>
    <movie-search></movie-search>
  </header>`;
  }

  setEvent() {
    const $homeButtom = this.querySelector('.home-button');
    if ($homeButtom instanceof HTMLImageElement)
      $homeButtom.addEventListener('click', () => {
        this.dispatchEvent(
          new CustomEvent('click-home-button', { bubbles: true }),
        );
      });
  }
}

customElements.define('movie-header', MovieHeader);
