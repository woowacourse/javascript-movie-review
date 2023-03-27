import template from './index.html';
import { STRING } from '../../utils/Constant';

export class Modal extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = template;
  }

  close = () => {
    const modal = document.querySelector('.modal');
    if (!(modal instanceof HTMLDialogElement)) throw new Error(STRING.NOT_FIND_ELEMENT);
    modal.close();
  };

  show = () => {
    const modal = document.querySelector('.modal');
    if (!(modal instanceof HTMLDialogElement)) throw new Error(STRING.NOT_FIND_ELEMENT);
    modal.showModal();
  };
}
