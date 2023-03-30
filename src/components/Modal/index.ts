import template from './index.html';
import { $$ } from '../../utils/Dom';

export class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
  }

  close = () => {
    const modal = $$('.modal', HTMLDialogElement);
    modal.close();
  };

  show = () => {
    const modal = $$('.modal', HTMLDialogElement);
    modal.showModal();
  };
}
