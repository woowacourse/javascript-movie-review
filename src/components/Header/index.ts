import template from './index.html';

export class Header extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}
