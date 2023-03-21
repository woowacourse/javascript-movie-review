import template from './index.html';

export class Skeleton extends HTMLElement {
  #$movieItems: HTMLElement;

  constructor() {
    super();
    this.#$movieItems = document.querySelector('.item-list')!;
    this.innerHTML = template;

    this.attachSkeleton();
  }

  attachSkeleton() {
    this.#$movieItems.insertAdjacentHTML('beforeend', this.innerHTML);
  }

  searchSkeleton() {
    this.#$movieItems.innerHTML = this.innerHTML;
  }

  moreButtonRemoveSkeleton() {
    document.querySelector('.item-list .skeleton-list')?.remove();
  }

  removeSkeleton() {
    this.#$movieItems.replaceChildren();
  }
}
