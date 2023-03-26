import template from './index.html';

export class SeeMoreButton extends HTMLElement {
  $li: HTMLElement;
  constructor() {
    super();
    this.$li = document.querySelector('.ul')!;
  }

  connectedCallback() {
    this.innerHTML = template;
    this.$li = document.querySelector('ul')!.querySelector('movie-item:last-of-type')!;
  }
}
