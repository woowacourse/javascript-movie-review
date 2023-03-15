import template from './index.html';

export class Skeleton extends HTMLElement {
  $movieItems: HTMLElement;

  constructor() {
    super();
    this.$movieItems = document.querySelector('.item-list')!;
    this.innerHTML = template;

    this.attachSkeleton();
  }

  attachSkeleton() {
    this.$movieItems.innerHTML = this.innerHTML;
  }

  removeSkeleton() {
    this.$movieItems.replaceChildren();
  }
}
