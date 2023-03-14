import template from './index.html';

export class MovieItem extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}
