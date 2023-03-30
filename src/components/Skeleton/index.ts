import template from './index.html';
import { $$ } from '../../utils/Dom';

export class Skeleton extends HTMLElement {
  #$movieItems: HTMLElement;

  constructor() {
    super();
    this.#$movieItems = $$('.item-list', HTMLUListElement);
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
    $$('.skeleton-view', HTMLDivElement).remove();
  }

  removeSkeleton() {
    this.#$movieItems.replaceChildren();
  }
}
