import './index.css';
import template from './index.html';
import { $ } from '../../utils/dom';

export class SeeMoreButton extends HTMLElement {
  page: number;

  constructor() {
    super();
    this.page = 1;
  }

  connectedCallback() {
    this.innerHTML = template;
  }

  addMoreButtonHandler(moreButtonHandler: CallableFunction) {
    this.addEventListener('click', () => {
      moreButtonHandler();
    });
  }

  remove() {
    $<HTMLButtonElement>('.btn', this).classList.add('button-close');
  }

  attach() {
    $<HTMLButtonElement>('.btn', this).classList.remove('button-close');
  }
}
