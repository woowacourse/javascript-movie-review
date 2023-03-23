import template from './index.html';

export class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
  }

  close() {
    (document.querySelector('.modal') as HTMLDialogElement).close();
  }

  show() {
    (document.querySelector('.modal') as HTMLDialogElement).showModal();
  }
}
