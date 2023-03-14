import template from './index.html';

export class MovieList extends HTMLElement {
  connectedCallback() {
    this.innerHTML = template;
  }
}
