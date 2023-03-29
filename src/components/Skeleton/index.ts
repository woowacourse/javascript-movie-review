import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

class Skeleton extends HTMLElement {
  $movieItems: HTMLElement;

  constructor() {
    super();
    this.$movieItems = $<HTMLUListElement>('.item-list');
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

export default Skeleton;
