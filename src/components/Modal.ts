import BodyController from '../utils/bodyController';
import { $ } from '../utils/dom';

class Modal {
  private $dialog: HTMLDialogElement;
  private $modalDrop: HTMLDivElement;

  constructor() {
    this.$dialog = $<HTMLDialogElement>('#modal');
    this.$modalDrop = $<HTMLDivElement>('.modal-backdrop');

    this.$modalDrop?.addEventListener('click', () => this.close());
    window.addEventListener('keyup', (event) => {
      if (event.defaultPrevented) return;
      if (event.key === 'Escape') this.close();
    });
  }

  getDialog() {
    return this.$dialog;
  }

  open() {
    BodyController().addClass('scroll-lock');
    this.$dialog.showModal();
  }

  close(isBack = false) {
    BodyController().removeClass('scroll-lock');

    this.$dialog.close();

    if (isBack) {
      history.back();
      return;
    }
    history.pushState('', '', '/');
  }
}

const modal = new Modal();

export default modal;
