import template from './index.html';

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
    this.querySelector('.btn')?.classList.add('button-close');
  }

  attach() {
    this.querySelector('.btn')?.classList.remove('button-close');
  }
}
