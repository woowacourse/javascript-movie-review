import template from './index.html';

export class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
  }

  close() {
    (this.querySelector('.one') as HTMLDialogElement).close();
  }

  show() {
    (document.querySelector('.one') as HTMLDialogElement).showModal();
  }
}
